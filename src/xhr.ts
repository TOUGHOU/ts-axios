import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responesType, timeout } = config
    const xhr = new XMLHttpRequest()
    if (responesType) {
      xhr.responseType = responesType
    }

    xhr.open(method.toUpperCase(), url, true)

    xhr.onerror = function() {
      reject(new Error('Network Error'))
    }

    if (timeout) {
      xhr.ontimeout = function() {
        reject(new Error(`Timeout of ${timeout} ms exceeded`))
      }
    }

    xhr.onreadystatechange = function(status) {
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responesType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }

      handleResponse(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })

    xhr.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Requset failed with status code ${response.status}`))
      }
    }
  })
}

export default xhr
