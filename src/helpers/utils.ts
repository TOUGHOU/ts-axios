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

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isUrlSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const k in from) {
    ;(to as T & U)[k] = from[k] as any
  }

  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  if (objs) {
    objs.forEach(obj => {
      if (obj) {
        Object.keys(obj).forEach(key => {
          const value = obj[key]
          if (isPlainObject(value)) {
            if (isPlainObject(result[key])) {
              result[key] = deepMerge(result[key], value)
            } else {
              result[key] = deepMerge(value)
            }
          } else {
            result[key] = value
          }
        })
      }
    })
  }

  return result
}
