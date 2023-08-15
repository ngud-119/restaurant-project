import Axios from 'axios';
import { serverUrl } from "../constants/config";

async function updateConfig(config) {
  const token = localStorage.getItem('token');
  if (token) {
    if (!config) config = {};
    config.headers = { ...config.headers, Authorization: token };
  }

  return config;
}

const ApiCall = {
  get: async(url, config) => Axios.get(`${serverUrl}${url}`, await updateConfig(config)),
  delete: async(url, config) => Axios.delete(`${serverUrl}${url}`, await updateConfig(config)),
  head: async(url, config) => Axios.head(`${serverUrl}${url}`, await updateConfig(config)),
  options: async(url, config) => Axios.options(`${serverUrl}${url}`, await updateConfig(config)),
  post: async(url, data, config) => Axios.post(`${serverUrl}${url}`, data, await updateConfig(config)),
  put: async(url, data, config) => Axios.put(`${serverUrl}${url}`, data, await updateConfig(config)),
  patch: async(url, data, config) => Axios.patch(`${serverUrl}${url}`, data, await updateConfig(config))
}

export default ApiCall;