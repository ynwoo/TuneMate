import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, SPOTIFY_API_URL, SPOTIFY_AUTHORIZE_URL } from '@env';
import { isString } from '@/utils/typeCheck';

isString(API_BASE_URL);

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

isString(SPOTIFY_AUTHORIZE_URL);

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

isString(SPOTIFY_API_URL);

const spotifyApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: SPOTIFY_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/x-www-form-urlencoded',
      //   Accept: 'application/json',
    },
  });
  return instance;
};

const api = apiInstance();
const spotifyAuthApi = spotifyAuthApiInstance();
const spotifyApi = spotifyApiInstance();

export { api, spotifyAuthApi, spotifyApi };
