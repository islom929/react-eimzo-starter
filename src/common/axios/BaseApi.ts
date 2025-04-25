import { ENDPOINT_ROOT } from '../constants';
import { axiosInstance } from './axios.instance';

export class BaseApi {
  httpClient;
  baseUrl = ENDPOINT_ROOT;

  constructor() {
    this.httpClient = axiosInstance;
  }

  url(path: string) {
    return `${this.baseUrl}${path}`;
  }
}
