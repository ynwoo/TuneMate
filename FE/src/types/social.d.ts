interface Friend extends FriendRequest {
  relationId: number;
  freindId: number;
  commonPlayListId: string;
}

interface RecommendationFriend extends FriendRequest {
  userId: number;
  playListId: string;
}

interface FriendRequest {
  name: string;
  img: string;
  distance: string;
  musicalTasteSimilarity: string;
}

export type { Friend, FriendRequest, RecommendationFriend };
