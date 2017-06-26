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

    // The Object.assign() method only copies enumerable and own properties
    // from a source object to a target object.
    // because getState is in Store.prototype, Object.assign need a explicit way to do copy
    return Object.assign({}, store, {dispatch, getState: store.getState.bind(store)})
  }
}
