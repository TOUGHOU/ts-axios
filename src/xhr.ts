import { AxiosRequestConfig } from './types'

function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config
  const xhr = new XMLHttpRequest()

  xhr.open(method.toUpperCase(), url, true)
  xhr.send(data)
}

export default xhr
