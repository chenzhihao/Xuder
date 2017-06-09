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

let reducer = function (state = {}, action) {
  return state
}

function combineReducers (reducersMap) {
  return function (rootState = {}, action) {
    for (let key in reducersMap) {
      let subReducer = reducersMap[key]
      let subState = rootState[key]
      rootState[key] = subReducer(subState, action)
    }

    return rootState
  }
}

export {Store, combineReducers}
