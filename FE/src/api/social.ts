import { Friend, FriendRequest } from "@/types/social";
import { UserInfo } from "@/types/user";
import { api } from ".";
import { ChatRoom } from "@/types/chat";

const SOCIAL_SERVICE_URL = "social-service";
const SOCIAL_SERVICE_FRIENDS_URL = `${SOCIAL_SERVICE_URL}/friends`;

// 친구 목록 조회
export const getSocialFriends = async (): Promise<Friend[]> => {
  const response = await api.get<Friend[]>(SOCIAL_SERVICE_FRIENDS_URL);
  return response.data;
};

// 친구 삭제
export const deleteSocialFriend = async (userId: UserInfo["userId"]) => {
  await api.delete<void>(`${SOCIAL_SERVICE_FRIENDS_URL}/${userId}`);
};

// 친구 요청 목록 조회
export const getSocialFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await api.get<FriendRequest[]>(
    `${SOCIAL_SERVICE_URL}/friend-requests`
  );
  return response.data;
};

// 친구 신청
export const sendSocialFriendRequest = async (userId: UserInfo["userId"]) => {
  await api.post<void>(`${SOCIAL_SERVICE_URL}/friend-request`, { userId });
};

// 친구 요청 수락
export const acceptSocialFriendRequest = async (userId: UserInfo["userId"]) => {
  await api.post<void>(`${SOCIAL_SERVICE_URL}/acceptance/${userId}`);
};

// 친구 요청 거절
export const declineSocialFriendRequest = async (
  userId: UserInfo["userId"]
) => {
  await api.post<void>(`${SOCIAL_SERVICE_URL}/decline/${userId}`);
};

// 채팅 기록 조회
export const getChats = async (
  relationId: Friend["relationId"]
): Promise<ChatRoom> => {
  const response = await api.get(`${SOCIAL_SERVICE_URL}/chats/${relationId}`);
  return response.data;
};

// 채팅 방 접속
export const connectChatRoom = async (relationId: Friend["relationId"]) => {
  await api.post(`${SOCIAL_SERVICE_URL}/chat-in/${relationId}`);
};

// 채팅 방 퇴장(삭제 아님)
export const disconnectChatRoom = async (relationId: Friend["relationId"]) => {
  await api.post(`${SOCIAL_SERVICE_URL}/chat-out/${relationId}`);
};

// 내가 참여한 채팅방 목록 조회
export const getMyChatRooms = async (): Promise<
  {
    chatRoomId: ChatRoom["chatRoomId"];
  }[]
> => {
  const response = await api.get(`${SOCIAL_SERVICE_URL}/my-chats`);
  return response.data;
};

// 로그인 후 채팅 방 구독

// 채팅 보내기

// 웹소켓 연결
