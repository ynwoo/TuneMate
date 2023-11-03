import { getRecommendationSongs } from '@/api/recommendation';
import { useQuery } from '@tanstack/react-query';

// 노래 추천 목록 조회
const useRecommendationSongsQuery = () => {
  const query = useQuery({
    queryKey: ['useRecommendationSongsQuery'],
    queryFn: getRecommendationSongs,
  });

  return query;
};

export default useRecommendationSongsQuery;
