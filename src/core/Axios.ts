import { AxiosPromise, AxiosRequestConfig } from "../types";
import {dispatchRequest} from './dispatchRequest';
class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(config: AxiosRequestConfig, url: string): AxiosPromise {
    return dispatchRequest(Object.assign({}, config, {
      method: "get",
      url
    }))
  }
}