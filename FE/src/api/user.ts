import { TokenResponse, UserInfo } from "@/types/user";
import { api, reissueApi } from ".";
import { storage } from "@/utils/storage";

const USER_SERVICE_URL = "user-service";

// 로그인
export const login = async (): Promise<TokenResponse> => {
  const response = await api.get<TokenResponse>(
    // `http://k9a603.p.ssafy.io:8000/api/v1/user-service/oauth2/authorization/spotify`
    `${USER_SERVICE_URL}/oauth2/authorization/spotify`
  );
  return response.data;
};

// 유저 정보 조회
export const getUserInfo = async (
  userId: UserInfo["userId"]
): Promise<UserInfo> => {
  const response = await api.get<UserInfo>(
    `${USER_SERVICE_URL}/users/${userId}`
  );
  const userInfo = response.data;
  storage.setSpotifyAccessToken(userInfo.spotifyAccessToken);
  storage.setSpotifyUserId(userInfo.spotifyUserId);
  return userInfo;
};

// tunemate refresh token으로 access token 갱신
export const reissueToken = async () => {
  const response = await reissueApi.get(`${USER_SERVICE_URL}/users/reissue`);
  const { accessToken, userId } = response.data;
  storage.setAccessToken(accessToken);
  storage.setUserId(userId);
  return response.data;
};
