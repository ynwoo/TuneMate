import { getIndividualPlayListRepresentative } from "@/api/music/individual";
import { playlistState } from "@/store/atom";
import { QueryKey } from "@/constants/queryKey";
import { PlayList } from "@/types/playList";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

// 개인 대표 플레이리스트 조회
const useIndividualPlayListRepresentativeQuery = () => {
  const query = useQuery<PlayList | null, Error>({
    queryKey: QueryKey.useIndividualPlayListRepresentativeQuery(),
    queryFn: getIndividualPlayListRepresentative,
  });

  useEffect(() => {
    if (query.data) {
      const allUris = query.data.tracks.items.map((track) => track.track.uri);
      setPlaylist(allUris);
    }
  }, [query.data, setPlaylist]);
  return query;
};

export default useIndividualPlayListRepresentativeQuery;
