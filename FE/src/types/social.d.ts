import { PlayList } from "./playList";
import { UserInfo } from "./user";

interface Friend extends FriendRequest {
  type: "friend";
  relationId: number;
  friendId: UserInfo["userId"];
  commonPlayListId: PlayList["id"];
  friendPlaylistId: PlayList["id"];
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
  musicalTasteSimilarity?: string;
  similarity?: string;
}

interface SendFriendRequest {
  userId: UserInfo["userId"];
  distance: string;
  musicalTasteSimilarity: string;
}

interface FriendRequestMessage {
  accept: boolean;
  receiveUserId: Friend["friendId"];
  requestUserId: UserInfo["userId"];
  relationId?: Friend["relationId"];
}

export type {
  Friend,
  FriendRequest,
  RecommendationFriend,
  SendFriendRequest,
  FriendRequestMessage,
};
