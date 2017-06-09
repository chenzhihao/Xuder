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
  animal: animalReducer,
})

test('Store can build initial states shape from reducer', t => {
  const store = new Store(reducer)
  t.deepEqual(store.getStates(), {fruit: 'cherry', animal: 'donkey'})
})

test('Store can update states from action', t => {
  const store = new Store(reducer)
  store.dispatch({type: 'dog'})
  t.deepEqual(store.getStates(), {fruit: 'cherry', animal: 'dog'})

  store.dispatch({type: 'UNKNOWN_TYPE'})
  t.deepEqual(store.getStates(), {fruit: 'cherry', animal: 'dog'})

  store.dispatch({type: 'banana'})
  t.deepEqual(store.getStates(), {fruit: 'banana', animal: 'dog'})
})

test.cb('Store can do broadcast when there is an action', t => {
  const store = new Store(reducer)
  store.subscribe(function () {
    t.deepEqual(store.getStates(), {fruit: 'cherry', animal: 'dog'})
    t.end()
  });
  store.dispatch({type: 'dog'})
})

