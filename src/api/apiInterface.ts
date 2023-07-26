import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {  serverUrl  } from "../constants/config";

const REFRESH_LIMIT_S = 10; // Refresh limit in seconds

async function getToken(): Promise<string | null> {
  const token = localStorage.getItem('token');
  if (token) {
    // Check if the token has expired
    // Format of JWT is "<header>.<payload>.<signature>"
    // We are only interested in the the <payload> which is a Base64 encoded JSON
    const match = token.match(/\.(\w+)\./);
    if (match && match.length > 1) {
      const tokenPayload = JSON.parse(window.atob(match[1]));
      const exp = new Date(0).setUTCSeconds(tokenPayload.exp);
      const diffSeconds = (exp - new Date().valueOf()) / 1000.0;
      // Token about to expire?
      if (diffSeconds < REFRESH_LIMIT_S) {
        // TODO: Refresh the token
      }
    }
  }
  return token;
}

async function updateConfig<D = any>(config?: AxiosRequestConfig): Promise<AxiosRequestConfig | undefined> {
  const token = await getToken();
  if (token) {
    if (!config) config = {};
    config!.headers = { ...config.headers, Authorization: token };
  }

  return config;
}

export interface IApiCall {
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
}

const ApiCall: IApiCall = {
  get: async <T, R, D>(url: string, config?: AxiosRequestConfig) => Axios.get<T, R, D>(`${serverUrl}${url}`, await updateConfig(config)),
  delete: async <T, R, D>(url: string, config?: AxiosRequestConfig) => Axios.delete<T, R, D>(`${serverUrl}${url}`, await updateConfig(config)),
  head: async <T, R, D>(url: string, config?: AxiosRequestConfig) => Axios.head<T, R, D>(`${serverUrl}${url}`, await updateConfig(config)),
  options: async <T, R, D>(url: string, config?: AxiosRequestConfig) => Axios.options<T, R, D>(`${serverUrl}${url}`, await updateConfig(config)),
  post: async <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig) => Axios.post<T, R, D>(`${serverUrl}${url}`, data, await updateConfig(config)),
  put: async <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig) => Axios.put<T, R, D>(`${serverUrl}${url}`, data, await updateConfig(config)),
  patch: async <T, R, D>(url: string, data?: D, config?: AxiosRequestConfig) => Axios.patch<T, R, D>(`${serverUrl}${url}`, data, await updateConfig(config))
}

export default ApiCall;
