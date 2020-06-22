import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'

const strategies = Object.create(null)

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

function onlyValue2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 === 'undefined') {
    return val1
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 === 'undefined') {
    return val1
  }
}

const strategyKeys = ['params', 'data', 'url']
strategyKeys.forEach(key => {
  strategies[key] = onlyValue2Strategy
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strategies[key] = deepMergeStrategy
})

function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeFeild(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeFeild(key)
    }
  }

  function mergeFeild(key: string): void {
    const strat = strategies[key] || defaultStrategy
    config[key] = strat(config1[key], config2![key])
  }

  return config
}

export default mergeConfig
