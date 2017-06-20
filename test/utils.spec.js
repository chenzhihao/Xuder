import {compose} from '../src/utils'
import test from 'ava'

function add (num1, num2) {
  return num1 + num2
}

function twice (num) {
  return num * 2
}

function square (num) {
  return num * num
}

test('compose only one function', t => {
  t.is(add(1, 2), compose(add)(1, 2))
})

test('compose multiple function', t => {
  t.is(square(twice(add(1, 2))), compose(square, twice, add)(1, 2))
})
