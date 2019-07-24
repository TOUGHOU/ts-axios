import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  headers: {
    common: {
      Accept: 'application/json, text/plain/, */*'
    }
  }
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
