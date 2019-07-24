import { AxiosRequestConfig } from '../types'

const strategies = Object.create(null)

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

function onlyValue2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const strategyKeys = ['header', 'data', 'url']
strategyKeys.forEach(key => {
  strategies[key] = onlyValue2Strategy
})

function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  for (let key in config2) {
    mergeFeild(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeFeild(key)
    }
  }

  const config = Object.create(null)

  function mergeFeild(key: string): void {
    const strat = strategies[key] || defaultStrategy
    config[key] = strat(config1[key], config2![key])
  }

  return config
}

export default mergeConfig
