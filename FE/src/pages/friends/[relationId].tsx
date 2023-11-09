import ChatList from "@/components/chat/ChatList/ChatList";
import useChatsQuery from "@/hooks/queries/social/useChatsQuery";
import useChat from "@/hooks/useChat";
import Props from "@/types";
import { ChatRoom, MessageRequest } from "@/types/chat";
import { ChatFilter } from "@/utils/filter";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const messageRequest: MessageRequest = {
  content: "aa",
  relationId: 7,
  senderName: "aa",
  senderNo: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
};

interface ChatPageProps extends Props {}

const ChatPage = ({}: ChatPageProps) => {
  const params = useParams();
  const relationId = Number(params?.relationId as string);

  const { subscribe, publish, chatRooms } = useChat();
  const { data: prevChatRoom } = useChatsQuery(relationId);

  const chatRoom = useMemo(() => {
    const newChatRoom = chatRooms.find(
      ({ chatRoomId }) => chatRoomId === relationId
    );
    if (!prevChatRoom || !newChatRoom) return undefined;
    newChatRoom.messages = [...prevChatRoom.messages, ...newChatRoom.messages];
    return ChatFilter.chatRoom(newChatRoom);
  }, [prevChatRoom, chatRooms, relationId]);

  return (
    <div>
      {chatRoom && <ChatList chatRoom={chatRoom} />}
      <button onClick={() => subscribe(relationId)}>subscribe</button>
      <button onClick={() => publish(messageRequest)}>publish</button>
    </div>
  );
};

export default ChatPage;
