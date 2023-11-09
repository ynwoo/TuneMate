import { TokenResponse } from "@/types/user";

export const Storage = Object.freeze({
  getItem(name: string) {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },

  setItem(name: string, item: any) {
    if (!item) return;
    localStorage.setItem(name, JSON.stringify(item));
  },

  getAccessToken(): string {
    return Storage.getItem("accessToken");
  },

  setAccessToken(accessToken: string) {
    Storage.setItem("accessToken", accessToken);
  },

  getRefreshToken(): string {
    return Storage.getItem("refreshToken");
  },

  setRefreshToken(refreshToken: string) {
    Storage.setItem("refreshToken", refreshToken);
  },

  getUserId(): string {
    return Storage.getItem("userId");
  },

  setUserId(userId: string) {
    Storage.setItem("userId", userId);
  },

  getSpotifyAccessToken(): string {
    return Storage.getItem("spotifyAccessToken");
  },

  setSpotifyAccessToken(spotifyAccessToken: string) {
    Storage.setItem("spotifyAccessToken", spotifyAccessToken);
  },

  getSpotifyUserId(): string {
    return Storage.getItem("spotifyUserId");
  },

  setSpotifyUserId(spotifyUserId: string) {
    Storage.setItem("spotifyUserId", spotifyUserId);
  },

  setTokenResponse({ userId, accessToken, refreshToken }: TokenResponse) {
    Storage.setUserId(userId);
    Storage.setAccessToken(accessToken);
    Storage.setRefreshToken(refreshToken);
  },

  clear() {
    localStorage.clear();
  },
});
