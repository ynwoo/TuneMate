import { storage } from "@/utils/storage";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
console.log(API_BASE_URL);

const apiInstance = () => {
  const instance = axios.create({
    baseURL: "http://tunemate.co.kr/api/v1/",
    headers: {
      // "Access-Control-Allow-Origin": `http://localhost:3000`,
      // "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json,",
    },
  });

  return instance;
};

const spotifyApiInstance = () => {
  const instance = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = storage.getAccessToken();
      config.headers["Authorization"] = accessToken;
      return config;
    },
    (error) => {
      console.error("request error : ", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error("response error : ", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

const spotifyAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = storage.getSpotifyAccessToken();
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      console.error("request error : ", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error("response error : ", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export const spotifyApi = spotifyAuthInterceptor(spotifyApiInstance());
export const api = authInterceptor(apiInstance());
