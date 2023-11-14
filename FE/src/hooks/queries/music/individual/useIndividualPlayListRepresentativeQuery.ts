import { getIndividualPlayListRepresentative } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { PlayList } from "@/types/playList";
import { useQuery } from "@tanstack/react-query";

// 개인 대표 플레이리스트 조회
const useIndividualPlayListRepresentativeQuery = () => {
  const query = useQuery<PlayList | null, Error>({
    queryKey: QueryKey.useIndividualPlayListRepresentativeQuery(),
    queryFn: getIndividualPlayListRepresentative,
  });

  return query;
};

export default useIndividualPlayListRepresentativeQuery;
