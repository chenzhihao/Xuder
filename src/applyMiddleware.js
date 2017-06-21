import {compose} from './utils'

export default function applyMiddleware (...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    let dispatch = store.dispatch
    const middlewareAPI = {
      getState: store.getState.bind(store),
      dispatch: (action) => dispatch(action)
    }

    // each middleware is like store=> dispatch => action => {...}
    let middlewareChains = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...middlewareChains)(store.dispatch)
    return Object.assign(store, {dispatch})
  }
}
