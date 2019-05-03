import { isPlainObject } from './utils'

export function transformData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }
  return data
}
