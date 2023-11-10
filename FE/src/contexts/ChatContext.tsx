import { createContext, useRef, useCallback, useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { Friend } from "@/types/social";
import { ChatRoom, MessageRequest } from "@/types/chat";
import useMyChatRoomsQuery from "@/hooks/queries/social/useMyChatRoomsQuery";

export interface ChatContextState {
  connect: (relationIds?: number[]) => void;
  disconnect: () => void;
  subscribe: (relationId: Friend["relationId"]) => void;
  publish: (messageRequest: MessageRequest) => void;
  chatRooms: ChatRoom[];
}

export const ChatContext = createContext<ChatContextState>(
  {} as ChatContextState
);

type ChatProvider = Props;

const ChatProvider = ({ children }: ChatProvider) => {
  const client = useRef<Client | undefined>(undefined);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { data: myChatRooms } = useMyChatRoomsQuery();
  const subscibeCallback = useCallback(
    (data: any) => {
      console.log(data);

      // 새로운 chatroom
      const newChatRoom: ChatRoom = JSON.parse(data.body);

      // 기존 chatroom 있는지 찾기
      let prevChatRoomId = chatRooms.findIndex(
        ({ chatRoomId }) => chatRoomId === newChatRoom.chatRoomId
      );

      // 기존 chatroom 없으면 배열 마지막에 삽입
      if (prevChatRoomId === -1) prevChatRoomId = chatRooms.length;

      const newChatRooms = [...chatRooms];
      newChatRooms[prevChatRoomId] = newChatRoom;
      setChatRooms(newChatRooms);
    },
    [chatRooms]
  );

  const connect = useCallback(
    (relationIds?: Friend["relationId"][]) => {
      if (client.current) return;
      Stomp.connect(client, relationIds, subscibeCallback);
    },
    [subscibeCallback]
  );

  const disconnect = useCallback(() => {
    if (client.current) {
      Stomp.disconnect(client.current);
      client.current = undefined;
    }
  }, []);

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (client.current) {
        Stomp.subscribe(client.current, relationId, subscibeCallback);
      }
    },
    [subscibeCallback]
  );

  const publish = useCallback((messageRequest: MessageRequest) => {
    if (client.current) {
      Stomp.publish(client.current, messageRequest);
    }
  }, []);

  useEffect(() => {
    if (connect && myChatRooms) {
      const prevChatRooms = chatRooms.map(({ chatRoomId }) => chatRoomId);
      const newChatRooms = myChatRooms.filter(
        (chatRoomId) => !prevChatRooms.includes(chatRoomId)
      );
      connect(newChatRooms);
    }
  }, [chatRooms, connect, myChatRooms]);

  return (
    <ChatContext.Provider
      value={{
        connect,
        disconnect,
        subscribe,
        publish,
        chatRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
