export const storage = {
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
};
