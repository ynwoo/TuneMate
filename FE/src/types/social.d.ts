import { UserInfo } from './user';

interface Friend extends FriendRequest {
  relationId: number;
  freindId: UserInfo['userId'];
  commonPlayListId: string;
}

interface RecommendationFriend extends FriendRequest {
  userId: UserInfo['userId'];
  playListId: string;
}

interface FriendRequest {
  name: string;
  img: string;
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend };
