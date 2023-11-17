import { getOthersPlayList } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { PlayList } from "@/types/playList";
import { useQuery } from "@tanstack/react-query";

// 다른 사람의 대표 플레이리스트 불러오기
const useFriendPlayListRepresentativeQuery = (playlistId: PlayList["id"]) => {
  const query = useQuery({
    queryKey: QueryKey.useFriendPlayListRepresentativeQuery(playlistId),
    queryFn: () => getOthersPlayList(playlistId),
  });

  return query;
};

export default useFriendPlayListRepresentativeQuery;
