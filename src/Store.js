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
    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(({listener, mapStateToProps = noop, mapDispatchToProps = noop}) => {
        const stateProps = mapStateToProps(this.state) || {}
        const dispatchProps = mapDispatchToProps(this.dispatch) || {}
        listener(Object.assign({}, stateProps, dispatchProps))
      })
  }

  subscribe (mapStateToProps, mapDispatchToProps) {
    return listener => {
      const subscriber = {listener, mapStateToProps, mapDispatchToProps}
      this.subscribers = this
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
