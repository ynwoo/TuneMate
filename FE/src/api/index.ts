import axios, { AxiosInstance } from 'axios';
import {
  API_BASE_URL,
  SPOTIFY_API_URL,
  SPOTIFY_AUTHORIZE_URL,
  SPOTIFY_TOKEN_API_URL,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const spotifyAuthApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: SPOTIFY_AUTHORIZE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  });
  return instance;
};

const spotifyTokenApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: SPOTIFY_TOKEN_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/x-www-form-urlencoded',
      // Accept: 'application/json',
    },
  });
  return instance;
};
const spotifyApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: SPOTIFY_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/x-www-form-urlencoded',
      // Accept: 'application/json',
    },
  });
  return instance;
};

const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
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
const spotifyAuthApi = spotifyAuthApiInstance();
const spotifyApi = spotifyApiInstance();
const spotifyTokenApi = spotifyTokenApiInstance();

export { api, authApi, spotifyAuthApi, spotifyApi, spotifyTokenApi };
