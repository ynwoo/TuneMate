import { SPOTIFY_API_BASE_URL, TUNEMATE_API_BASE_URL } from "@/constants/url";
import { Storage } from "@/utils/storage";
import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { getUserInfo, reissueToken } from "./user";
import { Cookie } from "@/utils/cookie";

let loading = false;

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
      const accessToken = Storage.getAccessToken();
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
      console.log(error);

      console.log("Storage.getRefreshToken()", Storage.getRefreshToken());
      if (error.response.status === HttpStatusCode.Unauthorized) {
        if (Storage.getRefreshToken() && !loading) {
          loading = true;
          // token 재발급
          try {
            await reissueToken();
            loading = false;
            location.reload();
            return Promise.resolve();
          } catch (error) {
            Storage.clear();
            Cookie.clear();
            return Promise.reject(error);
          }
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
      const refreshToken = Storage.getRefreshToken();
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
      const accessToken = Storage.getSpotifyAccessToken();
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
      if (error.response.status === HttpStatusCode.Unauthorized) {
        const accessToken = Storage.getAccessToken();
        const userId = Storage.getUserId();
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
