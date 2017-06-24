(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
	: typeof define === 'function' && define.amd ? define(['exports'], factory)
	: (factory((global.xuder = global.xuder || {})))
}(this, function (exports) {
  'use strict'

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

  function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  function isString (str) {
    return Object.prototype.toString.call(str) === '[object String]'
  }

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (args) => f(g(h(args))).
 */
  function compose (...funcs) {
    return funcs.reduce((acc, func) => (...args) => acc(func(...args)))
  }

/**
 * Shallow compare if two objects have different key or different value for same key(shallowly)
 * @param a Object a
 * @param b Object b
 * @returns {boolean}
 */
  function shallowCompare (a, b) {
    for (let i in a) {
      if (!(i in b)) {
        return true
      }
    }

    for (let i in b) {
      if (a[i] !== b[i]) {
        return true
      }
    }
    return false
  }

  const ActionTypes = {
    INIT: '@@xuder/INIT'
  }

  class Store {
    constructor (reducer, initialState = {}) {
      this.reducer = reducer
      this.state = initialState
      this.subscribers = []
      this.dispatch = this._dispatch.bind(this)
      this.dispatch({type: ActionTypes.INIT})
    }

  /**
   * Dispatch the action
   * @param {Object} action A plain object representing “what changed”.
   * @returns {Object} we need to return action as convenience.
   * Thus we can chain the middleware by passing action or something
   * @private
   */
    _dispatch (action) {
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

  function createStore (reducer, preloadedState, enhancer) {
    if (typeof enhancer === 'function') {
      return enhancer(createStore)(reducer, preloadedState)
    }

    if (typeof preloadedState === 'function') {
      return preloadedState(createStore)(reducer)
    }

    return new Store(reducer, preloadedState)
  }

  function applyMiddleware (...middlewares) {
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
      return Object.assign({}, store, {dispatch, getState: store.getState})
    }
  }

  exports.combineReducers = combineReducers
  exports.shallowCompare = shallowCompare
  exports.createStore = createStore
  exports.applyMiddleware = applyMiddleware

  Object.defineProperty(exports, '__esModule', { value: true })
}))
// # sourceMappingURL=xuder.js.map
