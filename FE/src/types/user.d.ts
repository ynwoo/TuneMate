interface UserInfo {
  userId: string;
  spotifyUserId: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: UserInfo['userId'];
}

export type { UserInfo, TokenResponse };
