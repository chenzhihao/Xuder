import test from 'ava'
import createStore from '../src/createStore'
import combineReducer from '../src/combineReducers'

const fruitReducer = function (state = '', action) {
  switch (action.type) {
    case 'apple': {
      return 'apple'
    }
    case 'banana': {
      return 'banana'
    }
    default:
      return state
  }
}

const animalReducer = function (state = '', action) {
  switch (action.type) {
    case 'dog': {
      return 'dog'
    }
    case 'cat': {
      return 'cat'
    }
    default:
      return state
  }
}

const reducer = combineReducer({
  fruit: fruitReducer,
  animal: animalReducer
})

test('create store without enhancer', t => {
  const store = createStore(reducer)
  t.deepEqual(store.getState(), {animal: '', fruit: ''})
})

test('create store without enhancer, but with initial state', t => {
  const store = createStore(reducer, {animal: 'wow', fruit: 'ahaha'})
  t.deepEqual(store.getState(), {animal: 'wow', fruit: 'ahaha'})
})

test('create store with enhancer and initial state', t => {
  let actionCalled = 0

  const dispatchCountEnhance = function (createStore) {
    return function (reducer, preloadedState) {
      let store = createStore(reducer, preloadedState)
      let dispatch = store.dispatch.bind(store)
      store.dispatch = function (action) {
        actionCalled = actionCalled + 1
        dispatch(action)
      }
      return store
    }
  }

  const store = createStore(reducer, {animal: 'wow', fruit: 'ahaha'}, dispatchCountEnhance)
  t.is(store.getState().fruit, 'ahaha')

  store.dispatch({type: 'apple'})

  t.is(store.getState().fruit, 'apple')
  t.is(actionCalled, 1)
})
