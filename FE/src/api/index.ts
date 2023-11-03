import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
console.log(API_BASE_URL);

const apiInstance = () => {
  const instance = axios.create({
    baseURL: "http://k9a603.p.ssafy.io:8000/api/v1/",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json,",
    },
  });
  return instance;
};

const spotifyApiInstance = () =>
  axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const spotifyApi = spotifyApiInstance();
export const api = apiInstance();
