import { RecommendationFriend } from '@/types/social';
import { Song } from '@/types/spotify';
import axios from 'axios';

const RECOMMENDATION_URL = 'recommendation-service';

// 노래 추천 목록 조회
export const getRecommendationSongs = async (): Promise<Song[]> => {
  const response = await axios.get<Song[]>(`${RECOMMENDATION_URL}/songs`);
  return response.data;
};

// 추천 친구 목록 조회
export const getRecommendationFriends = async (): Promise<
  RecommendationFriend[]
> => {
  const response = await axios.get<RecommendationFriend[]>(
    `${RECOMMENDATION_URL}/friends`,
  );
  return response.data;
};
