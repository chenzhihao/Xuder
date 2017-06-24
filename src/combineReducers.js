export default function combineReducers (reducersMap) {
  return function (rootState = {}, action) {
    for (let key in reducersMap) {
      let subReducer = reducersMap[key]
      let subState = rootState[key]
      rootState[key] = subReducer(subState, action)
    }

    return rootState
  }
}
