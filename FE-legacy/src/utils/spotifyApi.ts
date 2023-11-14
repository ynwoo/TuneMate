import axios from "axios";

const SPOTIFY_BASE_URL = 'https://api.spotify.com';

const spotifyApiToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyM2NiOTFkMy03OGFjLTQ1YjAtOTk1YS0zOGY4YmQzNDhkZmYiLCJleHAiOjE2OTg5NzgwNjYsImlzcyI6InR1bmVtYXRlIn0.bMxmuKUZt97oPfVLdGz6f-zQPWjrtPYImiaLRfozD2-yKpQ7U-f3DHLoLAEV_tCz';

const spotifyApi = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: spotifyApiToken,
  },
  withCredentials: true,
})

export default spotifyApi;