import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@env';
import { storage } from '@/utils/storage';

const apiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  });
  return instance;
};

const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = await storage.getAccessToken();
      console.log('accessToken', accessToken);
      config.headers['Authorization'] = accessToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

const api = apiInstance();
const authApi = authInterceptor(apiInstance());

export { api, authApi };
