import { useQuery } from "@tanstack/react-query";
import { getIndividualPlayLists } from "@/api/music/individual";
import { PlayList } from "@/types/playList";
import { UserInfo } from "@/types/user";
import { QueryKey } from "@/constants/queryKey";
import { useMemo } from "react";
import useIndividualPlayListRepresentativeQuery from "./useIndividualPlayListRepresentativeQuery";

// 개인 플레이리스트 목록조회
const useIndividualPlayListsQuery = (userId: UserInfo["userId"]) => {
  const { data: individualPlayList } = useIndividualPlayListRepresentativeQuery();
  const query = useQuery<PlayList[]>({
    queryKey: QueryKey.useIndividualPlayListsQuery(userId),
    queryFn: () => getIndividualPlayLists(userId),
    enabled: userId ? true : false,
  });

  const data = useMemo(() => {
    if (!query.data) return undefined;
    return query.data.filter(
      ({ name }) => !name.includes("공동") && name !== (individualPlayList?.name ?? "")
    );
  }, [query.data, individualPlayList]);
  return { ...query, data };
};

export default useIndividualPlayListsQuery;
