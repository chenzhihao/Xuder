import {noop} from './utils'

export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

export default class Store {
  constructor (reducer) {
    this.reducer = reducer
    this.state = reducer({}, {type: ActionTypes.INIT})
    this.subscribers = []
    this.dispatch =  this._dispatch.bind(this)
  }

  _dispatch (action) {
    const me = this
    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(function ({listener, mapStateToProps = noop, mapDispatchToProps = noop}) {
        const stateProps = mapStateToProps(me.state) || {}
        const dispatchProps = mapDispatchToProps(me.dispatch) || {}
        listener(Object.assign({}, stateProps, dispatchProps))
      })
  }

  subscribe (mapStateToProps, mapDispatchToProps) {
    const me = this
    return function (listener) {
      const subscriber = {listener, mapStateToProps, mapDispatchToProps}
      me.subscribers = me
        .subscribers
        .concat(subscriber)

      // unsubscribe
      return () => {
        const index = me.subscribers.indexOf(listener)
        me.subscribers.splice(index, 1)
      }
    }
  }

  getState () {
    return this.state
  }
}
