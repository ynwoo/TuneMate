import { SPOTIFY_API_BASE_URL, TUNEMATE_API_BASE_URL } from "@/constants/url";
import { storage } from "@/utils/storage";
import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { getUserInfo, reissueToken } from "./user";

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
    async (error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        if (storage.getRefreshToken()) {
          // token 재발급
          await reissueToken();

          // TODO: 페이지 새로고침 말고 다른 방법 필요
          location.reload();
        }
      }
      console.error("response error : ", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

const reissueInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const refreshToken = storage.getRefreshToken();
      config.headers["Authorization"] = refreshToken;
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
    async (error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        const accessToken = storage.getAccessToken();
        const userId = storage.getUserId();
        if (accessToken && userId) {
          // spotify token 재발급
          await getUserInfo(userId);
        }
      }
      console.error("response error : ", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export const spotifyApi = spotifyAuthInterceptor(spotifyApiInstance());
export const api = authInterceptor(apiInstance());
export const reissueApi = reissueInterceptor(apiInstance());
