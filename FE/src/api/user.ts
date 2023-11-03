import axios, { HttpStatusCode } from "axios";
import { TokenResponse, UserInfo } from "@/types/user";
import { api, spotifyApi } from ".";

// 로그인
export const login = async (): Promise<TokenResponse> => {
  const response = await api.get<TokenResponse>(
    // `http://k9a603.p.ssafy.io:8000/api/v1/user-service/oauth2/authorization/spotify`
    `user-service/oauth2/authorization/spotify`
  );
  return response.data;
};

// 유저 정보 조회
export const getUserInfo = async (
  userId: UserInfo["userId"]
): Promise<UserInfo> => {
  const response = await axios.get<UserInfo>(`user-service/users/${userId}`);
  if (response.status === HttpStatusCode.Ok) {
    spotifyApi.defaults.headers.common.Authorization = `Bearer ${response.data.spotifyAccessToken}`;
  }
  return response.data;
};
