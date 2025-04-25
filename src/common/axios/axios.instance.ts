import axios, { AxiosRequestConfig } from 'axios';

import { store } from '../../store';
import { axiosConfig } from './axios.config';
import { AxiosConfig, AxiosInstance } from './axios.types';
import { BASE_AUTH_TOKEN, BASE_AUTH_USER, ROUTE_LOGIN } from '../constants';
import { notificationSlice } from '../notification/slices';

const createAxiosInstance = (config: AxiosRequestConfig) => {
  const axiosInstance = axios.create(config) as AxiosInstance;

  axiosInstance.interceptors.request.use((config: AxiosConfig) => {
    if (!config.url) {
      return config;
    }

    const currentUrl = new URL(config.url, config.baseURL);
    Object.entries(config.pathParams || {}).forEach(([k, v]: [string, string]) => {
      currentUrl.pathname = currentUrl.pathname.replace(
        `:${k}`,
        Array.isArray(v) ? v.join(',') : encodeURIComponent(v),
      );
    });

    if (config.formData) {
      const formData = new FormData();
      Object.keys(config.data).forEach((fieldName) => {
        formData.append(fieldName, config.data[fieldName]);
      });

      if (config.headers) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      config.data = formData;
    }

    return {
      ...config,
      baseURL: `${currentUrl.protocol}//${currentUrl.host}`,
      url: currentUrl.pathname,
    };
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    }, (error) => {
      if (error.response?.status === 400 || error.response?.status === 500) {
        store.dispatch(notificationSlice.actions.open({message: error.response?.data?.debugMessage ||
          error.response?.data?.error?.message?.rus
          || 'Произошла ошибка'}))
      }
      if (error.response?.status === 401) {
        clearBearerToken();
        window.location.href = ROUTE_LOGIN;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance(axiosConfig);

export const setBearerToken = (token: string) => {
  localStorage.setItem(BASE_AUTH_TOKEN, token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setUserData = (data: any) => {
  localStorage.setItem(BASE_AUTH_USER, data);
};

export const clearBearerToken = () => {
  localStorage.removeItem(BASE_AUTH_TOKEN);
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export const AuthUser = JSON.parse(localStorage.getItem(BASE_AUTH_USER)!);
const accessToken = localStorage.getItem(BASE_AUTH_TOKEN);
if (accessToken) setBearerToken(accessToken);
