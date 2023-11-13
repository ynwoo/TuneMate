import { Friend } from "@/types/social";
import { ChatSocketUrl, FriendSocketUrl } from "@/types/stomp";

const TUNEMATE_DOMAIN = `tunemate.co.kr`;
const TUNEMATE_API_VERSION = "api/v1";
export const TUNEMATE_API_BASE_URL = `https://${TUNEMATE_DOMAIN}/${TUNEMATE_API_VERSION}`;
export const SPOTIFY_API_BASE_URL = `https://api.spotify.com/v1`;
export const SOCKET_API_BASE_URL = `${TUNEMATE_API_BASE_URL}/social-service`;

export const CHAT_SOCKET_URL: ChatSocketUrl = Object.freeze({
  brokerURL: () =>
    `wss://${TUNEMATE_DOMAIN}/${TUNEMATE_API_VERSION}/social-service/chat`,

  subscribeURL: (relationId: Friend["relationId"]) => `/topic/${relationId}`,

  publishURL: () => `/pub/chat`,
});

export const FRIEND_SOCKET_URL: FriendSocketUrl = Object.freeze({
  brokerURL: () =>
    `wss://${TUNEMATE_DOMAIN}/${TUNEMATE_API_VERSION}/social-service/chat`,

  // 친구 아이디 전달
  subscribeURL: (userId: Friend["friendId"]) => `/exchange/friend/${userId}`,

  // 내 아이디 전달
  publishURL: (userId: Friend["userId"]) => `/pub/request/${userId}`,
});
