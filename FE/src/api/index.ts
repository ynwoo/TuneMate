import axios, { AxiosInstance } from 'axios';
import {
  API_BASE_URL,
  SPOTIFY_API_URL,
  SPOTIFY_AUTHORIZE_URL,
  SPOTIFY_TOKEN_API_URL,
} from '@env';

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

const api = apiInstance();
const spotifyAuthApi = spotifyAuthApiInstance();
const spotifyApi = spotifyApiInstance();
const spotifyTokenApi = spotifyTokenApiInstance();

export { api, spotifyAuthApi, spotifyApi, spotifyTokenApi };
