import { getIndividualPlayListRepresentative } from '@/api/music/individual';
import { PlayList } from '@/types/playList';
import { useQuery } from '@tanstack/react-query';

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
