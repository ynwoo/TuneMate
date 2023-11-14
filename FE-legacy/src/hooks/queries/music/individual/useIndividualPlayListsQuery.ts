import { getIndividualPlayLists } from '@/api/music/individual';
import { TotalPlayList } from '@/types/playList';
import { useQuery } from '@tanstack/react-query';

// 개인 플레이리스트 목록조회
const useIndividualPlayListsQuery = () => {
  const query = useQuery<TotalPlayList>({
    queryKey: ['useIndividualPlayListsQuery'],
    queryFn: getIndividualPlayLists,
  });

  return query;
};

export default useIndividualPlayListsQuery;
