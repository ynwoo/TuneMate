import { useQuery } from "@tanstack/react-query";
import { getIndividualPlayLists } from "@/api/music/individual";
import { PlayList } from "@/types/playList";
import { UserInfo } from "@/types/user";
import { QueryKey } from "@/constants/queryKey";

// 개인 플레이리스트 목록조회
const useIndividualPlayListsQuery = (userId: UserInfo["userId"]) => {
  const query = useQuery<PlayList[]>({
    queryKey: QueryKey.useIndividualPlayListsQuery(userId),
    queryFn: () => getIndividualPlayLists(userId),
    enabled: userId ? true : false,
  });
  return query;
};

export default useIndividualPlayListsQuery;
