(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xuder = global.xuder || {})));
}(this, (function (exports) { 'use strict';

function combineReducers (reducersMap) {
  return function (rootState = {}, action) {
    for (let key in reducersMap) {
      let subReducer = reducersMap[key];
      let subState = rootState[key];
      rootState[key] = subReducer(subState, action);
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
};

class Store {
  constructor (reducer, initalState = {}) {
    this.reducer = reducer;
    this.state = initalState;
    this.subscribers = [];
    this.dispatch = this._dispatch.bind(this);
    this.dispatch({type: ActionTypes.INIT});
  }

  _dispatch (action) {
    if (!isObject(action) || !isString(action.type)) {
      throw new Error('action should be an object with "type" filed as string')
    }

    this.state = this.reducer(this.state, action);

    this
      .subscribers
      .forEach(subscriber => subscriber());
  }

  subscribe (subscriber) {
    const me = this;
    me.subscribers = me
      .subscribers
      .concat(subscriber);

    // unsubscribe
    return () => {
      const index = me.subscribers.indexOf(subscriber);
      me.subscribers.splice(index, 1);
    }
  }

  getState () {
    return this.state
  }
}

exports.Store = Store;
exports.combineReducers = combineReducers;
exports.shallowCompare = shallowCompare;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xuder.js.map
