const toString = Object.prototype.toString

export function isDate(param: any): param is Date {
  return toString.call(param) === '[object Date]'
}

export function isObject(param: any): param is Object {
  return param !== null && param === 'object'
}
