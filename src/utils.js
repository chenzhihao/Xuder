export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isString (str) {
  return Object.prototype.toString.call(str) === '[object String]'
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
export function compose (...funcs) {
  return funcs.reduce((acc, func) => (...args) => acc(func(...args)))
}

/**
 * Shallow compare if two objects have different key or different value for same key(shallowly)
 * @param a Object a
 * @param b Object b
 * @returns {boolean}
 */
export function shallowCompare (a, b) {
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
