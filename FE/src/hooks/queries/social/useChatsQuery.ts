import { getChats } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import useChat from "@/hooks/chat/useChat";
import { Friend } from "@/types/social";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// 채팅 기록 조회
const useChatsQuery = (relationId: Friend["relationId"]) => {
  const { refreshChatRooms } = useChat();

  const query = useQuery({
    queryKey: QueryKey.useChatsQuery(relationId),
    queryFn: () => getChats(relationId),
    enabled: relationId >= 0 ? true : false,
  });

  useEffect(() => {
    if (query.data) {
      refreshChatRooms(query.data);
    }
  }, [query.data]);

  return query;
};

export default useChatsQuery;
