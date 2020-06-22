import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
const defaults: AxiosRequestConfig = {
  method: 'get',

  headers: {
    common: {
      Accept: 'application/json, text/plain/, */*'
    }
  },

  xsrfCookiName: 'XSRF-COOKIE',
  xsrfHeaderName: 'X-XSRF-COOKIE',

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodWithoutData = ['get', 'delete', 'head', 'options']

methodWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
