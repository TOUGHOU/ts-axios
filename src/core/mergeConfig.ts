import { AxiosRequestConfig } from '../types'

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

function onlyValue2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const strategy = ['header', 'data', 'url']

function mergeConfig(val1: AxiosRequestConfig, val2: AxiosRequestConfig): AxiosRequestConfig {
  const config = Object.create(null)

  return config
}

export default mergeConfig
