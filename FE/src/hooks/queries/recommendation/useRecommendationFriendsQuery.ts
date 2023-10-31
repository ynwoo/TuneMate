import { getRecommendationFriends } from '@/api/recommendation';
import { RecommendationFriend } from '@/types/social';
import { useQuery } from '@tanstack/react-query';

const useRecommendationFriendsQuery = () => {
  const query = useQuery<RecommendationFriend[]>({
    queryKey: ['useRecommendationFriendsQuery'],
    queryFn: getRecommendationFriends,
  });

  return query;
};

export default useRecommendationFriendsQuery;
