export function noop () {
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
