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
