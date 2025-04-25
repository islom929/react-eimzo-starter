import { AxiosPromise, AxiosRequestConfig, AxiosStatic } from 'axios';

export type AxiosConfig = {
  pathParams?: { [key: string]: string };
  formData?: boolean;
} & AxiosRequestConfig;

export interface AxiosInstance extends AxiosStatic {
  (config: AxiosConfig): AxiosPromise;
  (url: string, config?: AxiosConfig): AxiosPromise;
}
