import {isObject, isString} from './utils'

export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

export default class Store {
  constructor (reducer, initialState = {}) {
    this.reducer = reducer
    this.state = initialState
    this.subscribers = []
    this.dispatch({type: ActionTypes.INIT})
  }

  /**
   * Dispatch the action
   * @param {Object} action A plain object representing “what changed”.
   * @returns {Object} we need to return action as convenience.
   * Thus we can chain the middleware by passing action or something
   * @private
   */
  dispatch (action) {
    if (!isObject(action) || !isString(action.type)) {
      throw new Error('action should be an object with "type" filed as string')
    }

    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(subscriber => subscriber())

    return action
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
