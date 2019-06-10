import { request } from 'http'
import { config } from 'shelljs'
import { puts } from 'util';

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'post'
  | 'POST'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  headers?: any
  method?: Method
  params?: any
  data?: any
  responesType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig):AxiosPromise

  get(url: string, config: AxiosRequestConfig):AxiosPromise 

  head(url: string, config: AxiosRequestConfig):AxiosPromise 

  delete(url: string, config: AxiosRequestConfig):AxiosPromise
  
  options(url: string, config: AxiosRequestConfig):AxiosPromise

  put(url: string, config: AxiosRequestConfig, data:any):AxiosPromise 

  post(url: string, config: AxiosRequestConfig, data:any):AxiosPromise
  
  patch(url: string, config: AxiosRequestConfig, data:any):AxiosPromise
}

export interface AxioInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
