import { TokenResponse, User } from '@/types/user';
import { api, authApi } from '.';

// 로그인
export const login = async (code: string): Promise<TokenResponse> => {
  const response = await api.get<TokenResponse>(
    `user-service/login/oauth2/code/spotify?code=${code}`,
  );
  return response.data;
};

// 유저 정보 조회
export const getUserInfo = async (userId: User['userId']): Promise<User> => {
  const response = await authApi.get<User>(`user-service/users/${userId}`);
  return response.data;
};
