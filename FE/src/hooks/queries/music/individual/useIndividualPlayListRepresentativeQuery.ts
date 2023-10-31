import { getIndividualPlayListRepresentative } from '@/api/music/individual';
import { PlayList } from '@/types/playList';
import { useQuery } from '@tanstack/react-query';

// 개인 대표 플레이리스트 조회
const useIndividualPlayListRepresentativeQuery = (
  playlistId: PlayList['id'],
) => {
  const query = useQuery<PlayList, Error>({
    queryKey: ['useIndividualPlayListRepresentativeQuery', playlistId],
    queryFn: () => getIndividualPlayListRepresentative(playlistId),
  });

  return query;
};

export default useIndividualPlayListRepresentativeQuery;
