const toString = Object.prototype.toString

export function isDate(param: any): param is Date {
  return toString.call(param) === '[object Date]'
}

export function isObject(param: any): param is Object {
  return param !== null && param === 'object'
}

export function isPlainObject(param: any): param is Object {
  return toString.call(param) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const k in from) {
    ;(to as T & U)[k] = from[k] as any
  }

  return to as T & U
}
