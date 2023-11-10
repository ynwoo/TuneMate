import { UserInfo } from "./user";

interface Friend extends FriendRequest {
  type: "friend";
  relationId: number;
  friendId: UserInfo["userId"];
  commonPlayListId: string;
}

interface RecommendationFriend extends FriendRequest {
  type: "recommendation";
  playListId: string;
}

interface FriendRequest {
  type: "friendRequest";
  userId: UserInfo["userId"];
  distance: string;
  name: string;
  img: string;
  similarity: string;
}

interface SendFriendRequest {
  userId: UserInfo["userId"];
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend, SendFriendRequest };
