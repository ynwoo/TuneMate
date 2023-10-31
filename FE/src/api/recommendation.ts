import { RecommendationFriend } from '@/types/social';
import { authApi } from '.';

// 추천 친구 목록 조회
export const getRecommendationFriends = async () => {
  const response = await authApi.get<RecommendationFriend[]>(
    `recommendation/friends`,
  );
  return response.data;
};
