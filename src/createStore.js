import Store from './Store'

export default function createStore (reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof preloadedState === 'function') {
    return preloadedState(createStore)(reducer);
  }

  return new Store(reducer, preloadedState)
}
