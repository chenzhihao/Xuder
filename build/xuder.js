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

function noop () {
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
  constructor (reducer) {
    this.reducer = reducer;
    this.state = reducer({}, {type: ActionTypes.INIT});
    this.subscribers = [];
    this.dispatch =  this._dispatch.bind(this);
  }

  _dispatch (action) {
    const me = this;
    this.state = this.reducer(this.state, action);

    this
      .subscribers
      .forEach(function ({listener, mapStateToProps = noop, mapDispatchToProps = noop}) {
        const stateProps = mapStateToProps(me.state) || {};
        const dispatchProps = mapDispatchToProps(me.dispatch) || {};
        listener(Object.assign({}, stateProps, dispatchProps));
      });
  }

  subscribe (mapStateToProps, mapDispatchToProps) {
    const me = this;
    return function (listener) {
      const subscriber = {listener, mapStateToProps, mapDispatchToProps};
      me.subscribers = me
        .subscribers
        .concat(subscriber);

      // unsubscribe
      return () => {
        const index = this.subscribers.indexOf(listener);
        this.subscribers.splice(index, 1);
      }
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
