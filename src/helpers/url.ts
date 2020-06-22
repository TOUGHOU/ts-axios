import { isDate, isObject, isUrlSearchParams } from './utils'

interface URLOrigin {
  host: string
  protocol: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(
  url: string,
  params?: any,
  paramSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }
  let serializedParams

  if (paramSerializer) {
    serializedParams = paramSerializer(params)
  } else if (isUrlSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      const value = params[key]

      if (value === null || typeof value === 'undefined') {
        return
      }

      let values = []
      if (Array.isArray(value)) {
        values = value
        key += '[]'
      } else {
        values = [value]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isObject(val)) {
          val = JSON.stringify(val)
        }

        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const findIndex = url.indexOf('#')
    if (findIndex !== -1) {
      url = url.slice(0, findIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

export function isAbsoluteURL(url: string): boolean {
  return /^[a-z][a-z\d\+\_\.]\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function isURLSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveURL(requestUrl)

  return currentURL.host === parsedOrigin.host && currentURL.protocol === parsedOrigin.protocol
}

const urlNode = document.createElement('a')
const currentURL = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlNode.setAttribute('href', url)
  const { protocol, host } = urlNode

  return {
    protocol,
    host
  }
}
