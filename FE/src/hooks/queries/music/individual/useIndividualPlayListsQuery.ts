import { getIndividualPlayLists } from '@/api/music/individual';
import { TotalPlayList } from '@/types/playList';
import { useQuery } from '@tanstack/react-query';

const useIndividualPlayListsQuery = () => {
  const query = useQuery<TotalPlayList>({
    queryKey: ['useIndividualPlayListsQuery'],
    queryFn: getIndividualPlayLists,
  });

  return query;
};

export default useIndividualPlayListsQuery;
