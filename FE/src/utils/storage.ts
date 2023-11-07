import { TokenResponse } from "@/types/user";

export const storage = Object.freeze({
  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  },

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },

  setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  },

  getUserId() {
    return localStorage.getItem("userId");
  },

  setUserId(userId: string) {
    localStorage.setItem("userId", userId);
  },

  getSpotifyAccessToken() {
    return localStorage.getItem("spotifyAccessToken");
  },

  setSpotifyAccessToken(spotifyAccessToken: string) {
    localStorage.setItem("spotifyAccessToken", spotifyAccessToken);
  },

  getSpotifyUserId() {
    return localStorage.getItem("spotifyUserId");
  },

  setSpotifyUserId(spotifyUserId: string) {
    localStorage.setItem("spotifyUserId", spotifyUserId);
  },

  setTokenResponse({ userId, accessToken, refreshToken }: TokenResponse) {
    storage.setUserId(userId);
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
  },
});
