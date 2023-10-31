interface User {
  userId: string;
  spotifyUserId: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: User['userId'];
}

export type { User, TokenResponse };
