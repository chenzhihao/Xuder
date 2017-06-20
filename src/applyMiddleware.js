import {compose} from './utils'

export default function applyMiddleware (...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    // each middleware is like store=> dispatch => action => {...}
    let middlewareChains = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...middlewareChains)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
