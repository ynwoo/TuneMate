import { getChats } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import { Friend } from "@/types/social";
import { useQuery } from "@tanstack/react-query";

// 채팅 기록 조회
const useChatsQuery = (relationId: Friend["relationId"]) => {
  const query = useQuery({
    queryKey: QueryKey.useChatsQuery(relationId),
    queryFn: () => getChats(relationId),
    // staleTime: 0,
  });

  return query;
};

export default useChatsQuery;
