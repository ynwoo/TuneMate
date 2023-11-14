import { TokenResponse, UserInfo } from '@/types/user';
import axios from 'axios';

// 로그인
export const login = async (code: string): Promise<TokenResponse> => {
  const response = await axios.get<TokenResponse>(
    `user-service/login/oauth2/code/spotify?code=${code}`,
  );
  return response.data;
};

// 유저 정보 조회
export const getUserInfo = async (
  userId: UserInfo['userId'],
): Promise<UserInfo> => {
  const response = await axios.get<UserInfo>(`user-service/users/${userId}`);
  return response.data;
};
