import { Friend, FriendRequest } from "@/types/social";
import { UserInfo } from "@/types/user";
import { api } from ".";

const SOCIAL_FRIENDS_URL = "social-service/friends";

// 친구 목록 조회
export const getSocialFriends = async (): Promise<Friend[]> => {
  const response = await api.get<Friend[]>(SOCIAL_FRIENDS_URL);
  return response.data;
};

// 친구 삭제
export const deleteSocialFriend = async (userId: UserInfo["userId"]) => {
  await api.delete<void>(`${SOCIAL_FRIENDS_URL}/${userId}`);
};

// 친구 요청 목록 조회
export const getSocialFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await api.get<FriendRequest[]>(
    `social-service/friend-requests`
  );
  return response.data;
};

// 친구 신청
export const sendSocialFriendRequest = async (userId: UserInfo["userId"]) => {
  await api.post<void>(`social-service/friend-request`, { userId });
};

// 친구 요청 수락
export const acceptSocialFriendRequest = async (userId: UserInfo["userId"]) => {
  await api.post<void>(`social-service/acceptance/${userId}`);
};

// 친구 요청 거절
export const declineSocialFriendRequest = async (
  userId: UserInfo["userId"]
) => {
  await api.post<void>(`social-service/decline/${userId}`);
};

// 친구와의 채팅

// 내가 보유한 공동 플레이리스트 목록 조회
