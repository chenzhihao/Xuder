(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xuder = global.xuder || {})));
}(this, (function (exports) { 'use strict';

function combineReducers(reducersMap) {
  return function (rootState = {}, action) {
    for (let key in reducersMap) {
      let subReducer = reducersMap[key];
      let subState = rootState[key];
      rootState[key] = subReducer(subState, action);
    }

    return rootState;
  };
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
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
function compose(...funcs) {
  return funcs.reduce((acc, func) => (...args) => acc(func(...args)));
}

/**
 * Shallow compare if two objects have different key or different value for same key(shallowly)
 * @param a Object a
 * @param b Object b
 * @returns {boolean}
 */
function shallowCompare(a, b) {
  for (let i in a) {
    if (!(i in b)) {
      return true;
    }
  }

  for (let i in b) {
    if (a[i] !== b[i]) {
      return true;
    }
  }
  return false;
}

const ActionTypes = {
  INIT: '@@xuder/INIT'
};

class Store {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.state = initialState;
    this.subscribers = [];
    this.dispatch = this._dispatch.bind(this);
    this.dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Dispatch the action
   * @param {Object} action A plain object representing “what changed”.
   * @returns {Object} we need to return action as convenience.
   * Thus we can chain the middleware by passing action or something
   * @private
   */
  _dispatch(action) {
    if (!isObject(action) || !isString(action.type)) {
      throw new Error('action should be an object with "type" filed as string');
    }

    this.state = this.reducer(this.state, action);

    this.subscribers.forEach(subscriber => subscriber());

    return action;
  }

  subscribe(subscriber) {
    const me = this;
    me.subscribers = me.subscribers.concat(subscriber

    // unsubscribe
    );return () => {
      const index = me.subscribers.indexOf(subscriber);
      me.subscribers.splice(index, 1);
    };
  }

  getState() {
    return this.state;
  }
}

function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof preloadedState === 'function') {
    return preloadedState(createStore)(reducer);
  }

  return new Store(reducer, preloadedState);
}

function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch = store.dispatch;
    const middlewareAPI = {
      getState: store.getState.bind(store),
      dispatch: action => dispatch(action)

      // each middleware is like store=> dispatch => action => {...}
    };let middlewareChains = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...middlewareChains)(store.dispatch

    // The Object.assign() method only copies enumerable and own properties
    // from a source object to a target object.
    // because getState is in Store.prototype, Object.assign need a explicit way to do copy
    );return Object.assign({}, store, { dispatch, getState: store.getState });
  };
}

exports.combineReducers = combineReducers;
exports.shallowCompare = shallowCompare;
exports.createStore = createStore;
exports.applyMiddleware = applyMiddleware;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHVkZXIuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21iaW5lUmVkdWNlcnMuanMiLCIuLi9zcmMvdXRpbHMuanMiLCIuLi9zcmMvU3RvcmUuanMiLCIuLi9zcmMvY3JlYXRlU3RvcmUuanMiLCIuLi9zcmMvYXBwbHlNaWRkbGV3YXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyAocmVkdWNlcnNNYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyb290U3RhdGUgPSB7fSwgYWN0aW9uKSB7XG4gICAgZm9yIChsZXQga2V5IGluIHJlZHVjZXJzTWFwKSB7XG4gICAgICBsZXQgc3ViUmVkdWNlciA9IHJlZHVjZXJzTWFwW2tleV1cbiAgICAgIGxldCBzdWJTdGF0ZSA9IHJvb3RTdGF0ZVtrZXldXG4gICAgICByb290U3RhdGVba2V5XSA9IHN1YlJlZHVjZXIoc3ViU3RhdGUsIGFjdGlvbilcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdFN0YXRlXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nIChzdHIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdHIpID09PSAnW29iamVjdCBTdHJpbmddJ1xufVxuXG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqIChhcmdzKSA9PiBmKGcoaChhcmdzKSkpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZSAoLi4uZnVuY3MpIHtcbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZSgoYWNjLCBmdW5jKSA9PiAoLi4uYXJncykgPT4gYWNjKGZ1bmMoLi4uYXJncykpKVxufVxuXG4vKipcbiAqIFNoYWxsb3cgY29tcGFyZSBpZiB0d28gb2JqZWN0cyBoYXZlIGRpZmZlcmVudCBrZXkgb3IgZGlmZmVyZW50IHZhbHVlIGZvciBzYW1lIGtleShzaGFsbG93bHkpXG4gKiBAcGFyYW0gYSBPYmplY3QgYVxuICogQHBhcmFtIGIgT2JqZWN0IGJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvd0NvbXBhcmUgKGEsIGIpIHtcbiAgZm9yIChsZXQgaSBpbiBhKSB7XG4gICAgaWYgKCEoaSBpbiBiKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpIGluIGIpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG4iLCJpbXBvcnQge2lzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGNvbnN0IEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEB4dWRlci9JTklUJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yIChyZWR1Y2VyLCBpbml0aWFsU3RhdGUgPSB7fSkge1xuICAgIHRoaXMucmVkdWNlciA9IHJlZHVjZXJcbiAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlXG4gICAgdGhpcy5zdWJzY3JpYmVycyA9IFtdXG4gICAgdGhpcy5kaXNwYXRjaCA9IHRoaXMuX2Rpc3BhdGNoLmJpbmQodGhpcylcbiAgICB0aGlzLmRpc3BhdGNoKHt0eXBlOiBBY3Rpb25UeXBlcy5JTklUfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCB0aGUgYWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS5cbiAgICogQHJldHVybnMge09iamVjdH0gd2UgbmVlZCB0byByZXR1cm4gYWN0aW9uIGFzIGNvbnZlbmllbmNlLlxuICAgKiBUaHVzIHdlIGNhbiBjaGFpbiB0aGUgbWlkZGxld2FyZSBieSBwYXNzaW5nIGFjdGlvbiBvciBzb21ldGhpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kaXNwYXRjaCAoYWN0aW9uKSB7XG4gICAgaWYgKCFpc09iamVjdChhY3Rpb24pIHx8ICFpc1N0cmluZyhhY3Rpb24udHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYWN0aW9uIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBcInR5cGVcIiBmaWxlZCBhcyBzdHJpbmcnKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnJlZHVjZXIodGhpcy5zdGF0ZSwgYWN0aW9uKVxuXG4gICAgdGhpc1xuICAgICAgLnN1YnNjcmliZXJzXG4gICAgICAuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoKSlcblxuICAgIHJldHVybiBhY3Rpb25cbiAgfVxuXG4gIHN1YnNjcmliZSAoc3Vic2NyaWJlcikge1xuICAgIGNvbnN0IG1lID0gdGhpc1xuICAgIG1lLnN1YnNjcmliZXJzID0gbWVcbiAgICAgIC5zdWJzY3JpYmVyc1xuICAgICAgLmNvbmNhdChzdWJzY3JpYmVyKVxuXG4gICAgLy8gdW5zdWJzY3JpYmVcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBtZS5zdWJzY3JpYmVycy5pbmRleE9mKHN1YnNjcmliZXIpXG4gICAgICBtZS5zdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlXG4gIH1cbn1cbiIsImltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZSAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBwcmVsb2FkZWRTdGF0ZShjcmVhdGVTdG9yZSkocmVkdWNlcilcbiAgfVxuXG4gIHJldHVybiBuZXcgU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpXG59XG4iLCJpbXBvcnQge2NvbXBvc2V9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSAoLi4ubWlkZGxld2FyZXMpIHtcbiAgcmV0dXJuIChjcmVhdGVTdG9yZSkgPT4gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSlcbiAgICBsZXQgZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaFxuICAgIGNvbnN0IG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUuYmluZChzdG9yZSksXG4gICAgICBkaXNwYXRjaDogKGFjdGlvbikgPT4gZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuICAgIC8vIGVhY2ggbWlkZGxld2FyZSBpcyBsaWtlIHN0b3JlPT4gZGlzcGF0Y2ggPT4gYWN0aW9uID0+IHsuLi59XG4gICAgbGV0IG1pZGRsZXdhcmVDaGFpbnMgPSBtaWRkbGV3YXJlcy5tYXAobWlkZGxld2FyZSA9PiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpKVxuICAgIGRpc3BhdGNoID0gY29tcG9zZSguLi5taWRkbGV3YXJlQ2hhaW5zKShzdG9yZS5kaXNwYXRjaClcblxuICAgIC8vIFRoZSBPYmplY3QuYXNzaWduKCkgbWV0aG9kIG9ubHkgY29waWVzIGVudW1lcmFibGUgYW5kIG93biBwcm9wZXJ0aWVzXG4gICAgLy8gZnJvbSBhIHNvdXJjZSBvYmplY3QgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICAgIC8vIGJlY2F1c2UgZ2V0U3RhdGUgaXMgaW4gU3RvcmUucHJvdG90eXBlLCBPYmplY3QuYXNzaWduIG5lZWQgYSBleHBsaWNpdCB3YXkgdG8gZG8gY29weVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdG9yZSwge2Rpc3BhdGNoLCBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGV9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiY29tYmluZVJlZHVjZXJzIiwicmVkdWNlcnNNYXAiLCJyb290U3RhdGUiLCJhY3Rpb24iLCJrZXkiLCJzdWJSZWR1Y2VyIiwic3ViU3RhdGUiLCJpc09iamVjdCIsIm9iaiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImlzU3RyaW5nIiwic3RyIiwiY29tcG9zZSIsImZ1bmNzIiwicmVkdWNlIiwiYWNjIiwiZnVuYyIsImFyZ3MiLCJzaGFsbG93Q29tcGFyZSIsImEiLCJiIiwiaSIsIkFjdGlvblR5cGVzIiwiU3RvcmUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzdWJzY3JpYmVycyIsImRpc3BhdGNoIiwiX2Rpc3BhdGNoIiwiYmluZCIsInR5cGUiLCJJTklUIiwiRXJyb3IiLCJmb3JFYWNoIiwic3Vic2NyaWJlciIsIm1lIiwiY29uY2F0IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiY3JlYXRlU3RvcmUiLCJwcmVsb2FkZWRTdGF0ZSIsImVuaGFuY2VyIiwiYXBwbHlNaWRkbGV3YXJlIiwibWlkZGxld2FyZXMiLCJzdG9yZSIsIm1pZGRsZXdhcmVBUEkiLCJnZXRTdGF0ZSIsIm1pZGRsZXdhcmVDaGFpbnMiLCJtYXAiLCJtaWRkbGV3YXJlIiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZSxTQUFTQSxlQUFULENBQTBCQyxXQUExQixFQUF1QztTQUM3QyxVQUFVQyxZQUFZLEVBQXRCLEVBQTBCQyxNQUExQixFQUFrQztTQUNsQyxJQUFJQyxHQUFULElBQWdCSCxXQUFoQixFQUE2QjtVQUN2QkksYUFBYUosWUFBWUcsR0FBWixDQUFqQjtVQUNJRSxXQUFXSixVQUFVRSxHQUFWLENBQWY7Z0JBQ1VBLEdBQVYsSUFBaUJDLFdBQVdDLFFBQVgsRUFBcUJILE1BQXJCLENBQWpCOzs7V0FHS0QsU0FBUDtHQVBGOzs7QUNESyxTQUFTSyxRQUFULENBQW1CQyxHQUFuQixFQUF3QjtTQUN0QkMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCSixHQUEvQixNQUF3QyxpQkFBL0M7OztBQUdGLEFBQU8sU0FBU0ssUUFBVCxDQUFtQkMsR0FBbkIsRUFBd0I7U0FDdEJMLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkUsR0FBL0IsTUFBd0MsaUJBQS9DOzs7Ozs7Ozs7Ozs7O0FBYUYsQUFBTyxTQUFTQyxPQUFULENBQWtCLEdBQUdDLEtBQXJCLEVBQTRCO1NBQzFCQSxNQUFNQyxNQUFOLENBQWEsQ0FBQ0MsR0FBRCxFQUFNQyxJQUFOLEtBQWUsQ0FBQyxHQUFHQyxJQUFKLEtBQWFGLElBQUlDLEtBQUssR0FBR0MsSUFBUixDQUFKLENBQXpDLENBQVA7Ozs7Ozs7OztBQVNGLEFBQU8sU0FBU0MsY0FBVCxDQUF5QkMsQ0FBekIsRUFBNEJDLENBQTVCLEVBQStCO09BQy9CLElBQUlDLENBQVQsSUFBY0YsQ0FBZCxFQUFpQjtRQUNYLEVBQUVFLEtBQUtELENBQVAsQ0FBSixFQUFlO2FBQ04sSUFBUDs7OztPQUlDLElBQUlDLENBQVQsSUFBY0QsQ0FBZCxFQUFpQjtRQUNYRCxFQUFFRSxDQUFGLE1BQVNELEVBQUVDLENBQUYsQ0FBYixFQUFtQjthQUNWLElBQVA7OztTQUdHLEtBQVA7OztBQ3RDSyxNQUFNQyxjQUFjO1FBQ25CO0NBREQ7O0FBSVAsQUFBZSxNQUFNQyxLQUFOLENBQVk7Y0FDWkMsT0FBYixFQUFzQkMsZUFBZSxFQUFyQyxFQUF5QztTQUNsQ0QsT0FBTCxHQUFlQSxPQUFmO1NBQ0tFLEtBQUwsR0FBYUQsWUFBYjtTQUNLRSxXQUFMLEdBQW1CLEVBQW5CO1NBQ0tDLFFBQUwsR0FBZ0IsS0FBS0MsU0FBTCxDQUFlQyxJQUFmLENBQW9CLElBQXBCLENBQWhCO1NBQ0tGLFFBQUwsQ0FBYyxFQUFDRyxNQUFNVCxZQUFZVSxJQUFuQixFQUFkOzs7Ozs7Ozs7O1lBVVNoQyxNQUFYLEVBQW1CO1FBQ2IsQ0FBQ0ksU0FBU0osTUFBVCxDQUFELElBQXFCLENBQUNVLFNBQVNWLE9BQU8rQixJQUFoQixDQUExQixFQUFpRDtZQUN6QyxJQUFJRSxLQUFKLENBQVUsd0RBQVYsQ0FBTjs7O1NBR0dQLEtBQUwsR0FBYSxLQUFLRixPQUFMLENBQWEsS0FBS0UsS0FBbEIsRUFBeUIxQixNQUF6QixDQUFiOztTQUdHMkIsV0FESCxDQUVHTyxPQUZILENBRVdDLGNBQWNBLFlBRnpCOztXQUlPbkMsTUFBUDs7O1lBR1NtQyxVQUFYLEVBQXVCO1VBQ2ZDLEtBQUssSUFBWDtPQUNHVCxXQUFILEdBQWlCUyxHQUNkVCxXQURjLENBRWRVLE1BRmMsQ0FFUEY7OztLQUZWLENBS0EsT0FBTyxNQUFNO1lBQ0xHLFFBQVFGLEdBQUdULFdBQUgsQ0FBZVksT0FBZixDQUF1QkosVUFBdkIsQ0FBZDtTQUNHUixXQUFILENBQWVhLE1BQWYsQ0FBc0JGLEtBQXRCLEVBQTZCLENBQTdCO0tBRkY7OzthQU1VO1dBQ0gsS0FBS1osS0FBWjs7OztBQ2hEVyxTQUFTZSxXQUFULENBQXNCakIsT0FBdEIsRUFBK0JrQixjQUEvQixFQUErQ0MsUUFBL0MsRUFBeUQ7TUFDbEUsT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztXQUMzQkEsU0FBU0YsV0FBVCxFQUFzQmpCLE9BQXRCLEVBQStCa0IsY0FBL0IsQ0FBUDs7O01BR0UsT0FBT0EsY0FBUCxLQUEwQixVQUE5QixFQUEwQztXQUNqQ0EsZUFBZUQsV0FBZixFQUE0QmpCLE9BQTVCLENBQVA7OztTQUdLLElBQUlELEtBQUosQ0FBVUMsT0FBVixFQUFtQmtCLGNBQW5CLENBQVA7OztBQ1RhLFNBQVNFLGVBQVQsQ0FBMEIsR0FBR0MsV0FBN0IsRUFBMEM7U0FDL0NKLFdBQUQsSUFBaUIsQ0FBQ2pCLE9BQUQsRUFBVWtCLGNBQVYsS0FBNkI7VUFDN0NJLFFBQVFMLFlBQVlqQixPQUFaLEVBQXFCa0IsY0FBckIsQ0FBZDtRQUNJZCxXQUFXa0IsTUFBTWxCLFFBQXJCO1VBQ01tQixnQkFBZ0I7Z0JBQ1ZELE1BQU1FLFFBQU4sQ0FBZWxCLElBQWYsQ0FBb0JnQixLQUFwQixDQURVO2dCQUVUOUMsTUFBRCxJQUFZNEIsU0FBUzVCLE1BQVQ7OztLQUZ4QixDQU1BLElBQUlpRCxtQkFBbUJKLFlBQVlLLEdBQVosQ0FBZ0JDLGNBQWNBLFdBQVdKLGFBQVgsQ0FBOUIsQ0FBdkI7ZUFDV25DLFFBQVEsR0FBR3FDLGdCQUFYLEVBQTZCSCxNQUFNbEI7Ozs7O0tBQTlDLENBS0EsT0FBT3RCLE9BQU84QyxNQUFQLENBQWMsRUFBZCxFQUFrQk4sS0FBbEIsRUFBeUIsRUFBQ2xCLFFBQUQsRUFBV29CLFVBQVVGLE1BQU1FLFFBQTNCLEVBQXpCLENBQVA7R0FmRjs7Ozs7Ozs7OzsifQ==
