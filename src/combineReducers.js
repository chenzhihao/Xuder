export default function combineReducers (reducersMap) {
  return function (initialState = {}, action) {
    const newState = {}
    let isChanged = false
    for (let key in reducersMap) {
      let subReducer = reducersMap[key]
      let currentSubState = initialState[key]
      const newSubState = subReducer(currentSubState, action)
      newState[key] = newSubState

      if (currentSubState !== newSubState) {
        isChanged = true
      }
    }
    return isChanged ? newState : initialState
  }
}
