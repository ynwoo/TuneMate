import { getIndividualPlayListRepresentative } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { myPlayListState } from "@/store/playList";
import { PlayList } from "@/types/playList";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

// 개인 대표 플레이리스트 조회
const useIndividualPlayListRepresentativeQuery = () => {
  const setMyPlayListState = useSetRecoilState(myPlayListState);
  const query = useQuery<PlayList | null, Error>({
    queryKey: QueryKey.useIndividualPlayListRepresentativeQuery(),
    queryFn: getIndividualPlayListRepresentative,
  });

  useEffect(() => {
    if (query.data) {
      setMyPlayListState(query.data);
    }
  }, [query.data]);

  return query;
};

export default useIndividualPlayListRepresentativeQuery;
