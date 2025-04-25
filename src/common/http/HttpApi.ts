import { BaseApi } from '../axios';
import { ENDPOINT_ROOT } from '../constants';
import qs from 'qs';

export class HttpApi extends BaseApi {
  constructor() {
    super();
    this.baseUrl = ENDPOINT_ROOT;
  }

  async get<T>(route: string, params: any): Promise<T> {
    return await this.httpClient
      .get(this.url(route), {
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      })
      .then((response) => response.data);
  }

  async post(route: string, body: any, config: any = {}): Promise<any> {
    return await this.httpClient
      .post(this.url(route), body, config)
      .then((response) => response.data);
  }

  async put(route: string, body: any, config: any = {}): Promise<any> {
    return await this.httpClient
      .put(this.url(route), body, config)
      .then((response) => response.data);
  }

  async delete(route: string, params: any): Promise<any> {
    return await this.httpClient
      .delete(this.url(route), { params })
      .then((response) => response.data);
  }
}
