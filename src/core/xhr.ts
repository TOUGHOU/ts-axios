import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import cookie from '../helpers/cookie'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/utils'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responesType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookiName,
      xsrfHeaderName,
      onDownloadProgerss,
      onUploadProgerss
    } = config

    const xhr = new XMLHttpRequest()

    xhr.open(method.toUpperCase(), url!, true)

    configureReqest()

    addEvents()

    processHeaders()

    processCancel()

    xhr.send(data)

    function configureReqest(): void {
      if (responesType) {
        xhr.responseType = responesType
      }

      if (timeout) {
        xhr.timeout = timeout
      }

      if (withCredentials) {
        xhr.withCredentials = withCredentials
      }

      if (onDownloadProgerss) {
        xhr.onprogress = onDownloadProgerss
      }

      if (onUploadProgerss) {
        xhr.upload.onprogress = onUploadProgerss
      }
    }

    function addEvents(): void {
      xhr.onerror = function() {
        reject(createError('Network Error', config, null, xhr))
      }

      xhr.ontimeout = function() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', xhr))
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
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (withCredentials && !isURLSameOrigin(url!) && xsrfCookiName) {
        const xsrfValue = cookie.read(xsrfCookiName)

        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          xhr.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          xhr.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Requset failed with status code ${response.status}`,
            config,
            null,
            xhr,
            response
          )
        )
      }
    }
  })
}

export default xhr
