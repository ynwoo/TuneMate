import { getCommonPlayList } from "@/api/music/common";
import { QueryKey } from "@/constants/queryKey";
import { PlayList } from "@/types/playList";
import { useQuery } from "@tanstack/react-query";

// 공동 플레이리스트 조회
const useCommonPlayListQuery = (playlistId: string) => {
  const query = useQuery<PlayList>({
    queryKey: QueryKey.useCommonPlayListQuery(playlistId),
    queryFn: () => getCommonPlayList(playlistId),
  });

  return query;
};

export default useCommonPlayListQuery;
