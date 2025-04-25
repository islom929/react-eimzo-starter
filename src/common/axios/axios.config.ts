import { AxiosRequestConfig } from 'axios';
import { ENDPOINT_ROOT } from '../constants';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: ENDPOINT_ROOT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
};
