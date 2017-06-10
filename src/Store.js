import {noop} from './utils'

export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

export default class Store {
  constructor (reducer) {
    this.reducer = reducer
    this.state = reducer({}, {type: ActionTypes.INIT})
    this.subscribers = []
  }

  dispatch (action) {
    const me = this
    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(function ({listener, mapStateToProps = noop, mapDispatchToProps = noop}) {
        const stateProps = mapStateToProps(me.state) || {}
        const dispatchProps = mapDispatchToProps(me.dispatch.bind(me)) || {}
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
        const index = this.subscribers.indexOf(listener)
        this.subscribers.splice(index, 1)
      }
    }
  }

  getState () {
    return this.state
  }
}
