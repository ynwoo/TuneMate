import { getRecommendationSongs } from "@/api/recommendation";
import { QueryKey } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

// 노래 추천 목록 조회
const useRecommendationSongsQuery = () => {
  const query = useQuery({
    queryKey: QueryKey.useRecommendationSongsQuery(),
    queryFn: getRecommendationSongs,
  });

  return query;
};

export default useRecommendationSongsQuery;
