import {isObject, isString} from './utils'

export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

export default class Store {
  constructor (reducer, initalState = {}) {
    this.reducer = reducer
    this.state = initalState
    this.subscribers = []
    this.dispatch = this._dispatch.bind(this)
    this.dispatch({type: ActionTypes.INIT})
  }

  _dispatch (action) {
    if (!isObject(action) || !isString(action.type)) {
      throw new Error('action should be an object with "type" filed as string')
    }

    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(subscriber => subscriber())
  }

  subscribe (subscriber) {
    const me = this
    me.subscribers = me
      .subscribers
      .concat(subscriber)

    // unsubscribe
    return () => {
      const index = me.subscribers.indexOf(subscriber)
      me.subscribers.splice(index, 1)
    }
  }

  getState () {
    return this.state
  }
}
