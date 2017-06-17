export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isString (str) {
  return Object.prototype.toString.call(str) === '[object String]'
}