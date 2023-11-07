import { UserInfo } from "./user";

interface Friend extends FriendRequest {
  type: "friend";
  relationId: number;
  freindId: UserInfo["userId"];
  commonPlayListId: string;
}

interface RecommendationFriend extends FriendRequest {
  type: "recommendation";
  playListId: string;
}

interface FriendRequest extends SendFriendRequest {
  type: "friendRequest";
  name: string;
  img: string;
}

interface SendFriendRequest {
  userId: UserInfo["userId"];
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend, SendFriendRequest };
