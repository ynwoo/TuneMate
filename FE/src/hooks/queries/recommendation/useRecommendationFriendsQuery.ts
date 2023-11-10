import { useQuery } from "@tanstack/react-query";
import { getRecommendationFriends } from "@/api/recommendation";
import { RecommendationFriend } from "@/types/social";
import { QueryKey } from "@/constants/queryKey";

// 추천 친구 목록 조회
const useRecommendationFriendsQuery = () => {
  // TODO: 이미 요청을 보냈거나 친구인 사람 제외 필요
  const query = useQuery<RecommendationFriend[]>({
    queryKey: QueryKey.useRecommendationFriendsQuery(),
    queryFn: getRecommendationFriends,
  });

  return query;
};

export default useRecommendationFriendsQuery;
