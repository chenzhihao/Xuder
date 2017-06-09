export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

class Store {
  constructor (reducer) {
    this.reducer = reducer
    this.states = reducer({}, {type: ActionTypes.INIT})
    this.subscribers = []
  }

  dispatch (action) {
    // or keep it as immutable
    this.states = this.reducer(this.states, action)

    this
      .subscribers
      .forEach(subscriber => {
        subscriber()
      })
  }

  subscribe (cb) {
    this.subscribers = this
      .subscribers
      .concat(cb)
  }
}

import combineReducers from './combineReducers'
export {Store, combineReducers}
