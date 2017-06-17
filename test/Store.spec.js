import test from 'ava'
import Store from '../src/Store'
import combineReducer from '../src/combineReducers'

const fruitReducer = function (state = 'cherry', action) {
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

const animalReducer = function (state = 'donkey', action) {
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

test('Store can build initial state shape from reducer', t => {
  const store = new Store(reducer)
  t.deepEqual(store.getState(), {fruit: 'cherry', animal: 'donkey'})
})

test('Store can build initial state shape from constructor', t => {
  const store = new Store(reducer, {fruit: 'orange', animal: 'wombat'})
  t.deepEqual(store.getState(), {fruit: 'orange', animal: 'wombat'})
})

test('Store can update state from action', t => {
  const store = new Store(reducer)
  store.dispatch({type: 'dog'})
  t.deepEqual(store.getState(), {fruit: 'cherry', animal: 'dog'})

  store.dispatch({type: 'UNKNOWN_TYPE'})
  t.deepEqual(store.getState(), {fruit: 'cherry', animal: 'dog'})

  store.dispatch({type: 'banana'})
  t.deepEqual(store.getState(), {fruit: 'banana', animal: 'dog'})
})

test('Action dispatched by Store must be an object with "type" field as string', t => {
  const store = new Store(reducer)
  const error = t.throws(() => {
    store.dispatch()
  })

  t.is(error.message, 'action should be an object with "type" filed as string')
})

test.cb('Store can do broadcast when there is an action', t => {
  const store = new Store(reducer)
  store.subscribe(function () {
    t.deepEqual(store.getState(), {fruit: 'cherry', animal: 'dog'})
    t.end()
  })
  store.dispatch({type: 'dog'})
})

test.cb('Store can can connect to a listener', t => {
  const store = new Store(reducer)

  function listener () {
    t.is(store.getState().animal, 'dog')
    t.end()
  }

  store.subscribe(listener)
  store.dispatch({type: 'dog'})
})

test('Store can can disconnect to a listener', t => {
  let called = false

  const store = new Store(reducer)

  function listener () {
    called = true
  }

  const unsubscribe = store.subscribe(listener)
  unsubscribe()

  store.dispatch({type: 'dog'})
  t.is(called, false)
})
