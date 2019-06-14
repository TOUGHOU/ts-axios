import { AxiosPromise, AxiosRequestConfig, Method } from "../types";
import {dispatchRequest} from './dispatchRequest';

class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("get", url, config)
  }

  delete(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("delete", url, config)
  }

  head(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("head", url, config)
  }

  options(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData("options", url, config)
  }

  // post(){}

  // put(){}

  // patch(){}


  _requestMethodWithoutData(method: Method, url: string, config: AxiosRequestConfig) {
    return dispatchRequest(Object.assign({}, config, {
      method,
      url
    }))
  }
}