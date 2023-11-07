import { getChats } from "@/api/social";
import { Friend } from "@/types/social";
import { useQuery } from "@tanstack/react-query";

// 채팅 기록 조회
const useChatsQuery = (relationId: Friend["relationId"]) => {
  const query = useQuery({
    queryKey: ["useChatsQuery", relationId],
    queryFn: () => getChats(relationId),
  });

  return query;
};

export default useChatsQuery;
