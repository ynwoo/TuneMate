import { TokenResponse, UserInfo } from "@/types/user";
import { api, reissueApi } from ".";
import { Storage } from "@/utils/storage";

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
export const getUserInfo = async (userId: UserInfo["userId"]): Promise<UserInfo> => {
  const response = await api.get<UserInfo>(`${USER_SERVICE_URL}/users/${userId}`);
  const userInfo = response.data;
  Storage.setSpotifyAccessToken(userInfo.spotifyAccessToken);
  Storage.setSpotifyUserId(userInfo.spotifyUserId);
  Storage.setUserName(userInfo.name);
  Storage.setImageUrl(userInfo.imageUrl);
  return userInfo;
};

// tunemate refresh token으로 access token 갱신
export const reissueToken = async () => {
  const response = await reissueApi.get(`${USER_SERVICE_URL}/users/reissue`);
  const { accessToken, userId } = response.data;
  Storage.setAccessToken(accessToken);
  Storage.setUserId(userId);
  return response.data;
};
