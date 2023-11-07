import { TokenResponse } from "@/types/user";

export const storage = Object.freeze({
  getItem(name: string) {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },

  setItem(name: string, item: any) {
    if (!item) return;
    localStorage.setItem(name, JSON.stringify(item));
  },

  getAccessToken() {
    return storage.getItem("accessToken");
  },

  setAccessToken(accessToken: string) {
    storage.setItem("accessToken", accessToken);
  },

  getRefreshToken() {
    return storage.getItem("refreshToken");
  },

  setRefreshToken(refreshToken: string) {
    storage.setItem("refreshToken", refreshToken);
  },

  getUserId() {
    return storage.getItem("userId");
  },

  setUserId(userId: string) {
    storage.setItem("userId", userId);
  },

  getSpotifyAccessToken() {
    return storage.getItem("spotifyAccessToken");
  },

  setSpotifyAccessToken(spotifyAccessToken: string) {
    storage.setItem("spotifyAccessToken", spotifyAccessToken);
  },

  getSpotifyUserId() {
    return storage.getItem("spotifyUserId");
  },

  setSpotifyUserId(spotifyUserId: string) {
    storage.setItem("spotifyUserId", spotifyUserId);
  },

  setTokenResponse({ userId, accessToken, refreshToken }: TokenResponse) {
    storage.setUserId(userId);
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
  },

  clear() {
    localStorage.clear();
  },
});
