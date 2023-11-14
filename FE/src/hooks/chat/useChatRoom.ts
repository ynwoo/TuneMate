import { Friend } from "@/types/social";
import useChat from "./useChat";
import { useEffect, useMemo } from "react";
import { Storage } from "@/utils/storage";
import { CHAT } from "@/constants/chat";
import useChatsQuery from "../queries/social/useChatsQuery";

const useChatRoom = (relationId: Friend["relationId"]) => {
  const { chatRooms, refreshChatRooms } = useChat();
  const { data: prevChatRoom } = useChatsQuery(relationId);

  // 해당하는 채팅방
  const chatRoom = useMemo(
    () => chatRooms.find(({ chatRoomId }) => chatRoomId === relationId),
    [chatRooms, relationId]
  );

  // 마지막 메시지 구하기
  const lastMessage = useMemo(
    () => chatRoom?.messages[chatRoom?.messages.length - 1],
    [chatRoom]
  );

  // 상대방이 보낸 메시지 중에서 안 읽은 메시지 개수
  const unReadCount = useMemo(() => {
    if (!chatRoom) return 0;

    let count = 0;
    for (let index = chatRoom.messages.length - 1; index >= 0; index--) {
      const { senderNo, readCount } = chatRoom.messages[index];
      if (senderNo === Storage.getUserId() || readCount === CHAT.read) {
        return count;
      }

      count++;
    }

    return count;

    // return ChatFilter.messages(chatRoom.messages).filter(
    //   ({ readCount, senderNo }) =>
    //     senderNo !== Storage.getUserId() && readCount === CHAT.unRead
    // ).length;
  }, [chatRoom]);

  useEffect(() => {
    if (prevChatRoom && !chatRoom) {
      refreshChatRooms(prevChatRoom);
    }
  }, [prevChatRoom, chatRoom]);

  return { chatRoom, unReadCount, lastMessage };
};

export default useChatRoom;
