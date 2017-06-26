import test from 'ava'
import combineReducers from '../src/combineReducers'

test('basic reducer combination, ignore action', t => {
  let reducer1 = function (state = {}, action) {
    return {state: 'state1'}
  }

  let reducer2 = function (state = [], action) {
    return [1, 2, 3]
  }

  const combinedReducers = combineReducers({
    key1: reducer1,
    key2: reducer2
  })

  const action = {type: undefined}
  t.deepEqual(combinedReducers({}, action), {
    key1: {state: 'state1'},
    key2: [1, 2, 3]
  })
})

test('nested reducer combination, ignore action', t => {
  let reducer1 = function (state = {}, action) {
    return {state: 'state1'}
  }

  let reducer2 = function (state = [], action) {
    return [1, 2, 3]
  }

  let reducer3 = function (state = [], action) {
    return {
      state: {
        a: 'a',
        b: 'b',
        c: 'c'
      }
    }
  }

  const nestedReducer = combineReducers({
    key1: combineReducers({
      reducer1: reducer1,
      reducer2: reducer2
    }),
    key2: reducer3
  })

  const action = {type: undefined}
  t.deepEqual(nestedReducer({}, action), {
    key1: {
      reducer1: {state: 'state1'},
      reducer2: [1, 2, 3]
    },
    key2: {
      state: {
        a: 'a',
        b: 'b',
        c: 'c'
      }
    }
  })
})

test('if one state of reducer is changed, all its parent state should be changed to another reference', t => {
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

  const reducer = combineReducers({
    combine: combineReducers({
      fruit: fruitReducer,
      animal: animalReducer
    }),
    animal: animalReducer
  })

  let initialState = {}
  const state = reducer(initialState, {type: '###'})
  const state2 = reducer(state, {type: '@@@'})
  const state3 = reducer(state2, {type: 'apple'})

  t.true(state.combine === state2.combine)
  t.true(state === state2)

  t.false(state2 === state3)
  t.false(state2.combine === state3.combine)
})
