import { RecommendationFriend } from '@/types/social';
import axios from 'axios';

// 추천 친구 목록 조회
export const getRecommendationFriends = async () => {
  const response = await axios.get<RecommendationFriend[]>(
    `recommendation/friends`,
  );
  return response.data;
};
