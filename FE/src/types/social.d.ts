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

interface FriendRequest {
  type: "friendRequest";
  userId: UserInfo["userId"];
  name: string;
  img: string;
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend };
