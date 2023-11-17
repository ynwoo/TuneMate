import { PlayList } from "./playList";

interface UserInfo {
  userId: string;
  spotifyUserId: string;
  spotifyAccessToken: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface FriendUserInfo {
  userId: UserInfo["userId"];
  name: UserInfo["name"];
  playlistId: PlayList["id"];
  imageUrl: UserInfo["imageUrl"];
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userId: UserInfo["userId"];
}

export type { UserInfo, TokenResponse, FriendUserInfo };
