import { SPOTIFY_API_BASE_URL, TUNEMATE_API_BASE_URL } from "@/constants/url";
import { storage } from "@/utils/storage";
import axios, { AxiosInstance } from "axios";

const apiInstance = () => {
  const instance = axios.create({
    baseURL: TUNEMATE_API_BASE_URL,
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
    baseURL: SPOTIFY_API_BASE_URL,
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
