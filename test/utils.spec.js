import {compose, shallowCompare} from '../src/utils'
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

test('test shallowCompare on two deepEqual object', t => {
  const objA = {a: 'a', b: {a: 'a', b: 'b'}}
  const objB = {a: 'a', b: {a: 'a', b: 'b'}}
  t.true(shallowCompare(objA, objB))
})

test('test shallowCompare on two objects with same keys, same reference for nest object', t => {
  const b = {a: 'a', b: 'b'}
  const objA = {a: 'a', b: b}
  const objB = {a: 'a', b: b}
  t.false(shallowCompare(objA, objB))
})

test('test shallowCompare on two objects with different keys', t => {
  const b = {a: 'a', b: 'b'}
  const objA = {a: 'a', b: b, c: 'c'}
  const objB = {a: 'a', b: b}
  t.true(shallowCompare(objA, objB))
})
