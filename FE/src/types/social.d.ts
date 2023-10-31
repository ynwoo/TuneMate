import { User } from './user';

interface Friend extends FriendRequest {
  relationId: number;
  freindId: User['userId'];
  commonPlayListId: string;
}

interface RecommendationFriend extends FriendRequest {
  userId: User['userId'];
  playListId: string;
}

interface FriendRequest {
  name: string;
  img: string;
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend };
