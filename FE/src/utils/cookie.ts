import { TokenResponse } from "@/types/user";

const Cookie = Object.freeze({
  getCookie(name: string) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? decodeURI(value[2]) : null;
  },

  getAccessToken() {
    return Cookie.getCookie("accessToken");
  },

  getRefreshToken() {
    return Cookie.getCookie("refreshToken");
  },

  getUserId() {
    return Cookie.getCookie("userId");
  },

  getTokenResponse() {
    const userId = Cookie.getUserId();
    const accessToken = Cookie.getAccessToken();
    const refreshToken = Cookie.getRefreshToken();
    return { userId, accessToken, refreshToken } as TokenResponse;
  },

  setCookie(name: string, value: string, exp: number) {
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      encodeURI(value) +
      ";expires=" +
      date.toUTCString() +
      ";path=/";
  },

  setTokenResponse({ userId, accessToken, refreshToken }: TokenResponse) {
    Cookie.setCookie("userId", userId, 1);
    Cookie.setCookie("accessToken", accessToken, 1);
    Cookie.setCookie("refreshToken", refreshToken, 1);
  },
});

export { Cookie };
