import { createContext, useCallback, useState, useEffect } from "react";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { Friend } from "@/types/social";
import { ChatRoom, MessageRequest } from "@/types/chat";
import useMyChatRoomsQuery from "@/hooks/queries/social/useMyChatRoomsQuery";
import useStompClient from "@/hooks/useStompClient";
import { CHAT_SOCKET_URL } from "@/constants/url";

export interface ChatContextState {
  connect: (relationIds?: number[]) => void;
  subscribe: (relationId: Friend["relationId"]) => void;
  publish: (messageRequest: MessageRequest) => void;
  chatRooms: ChatRoom[];
}

export const ChatContext = createContext<ChatContextState>(
  {} as ChatContextState
);

const ChatProvider = ({ children }: Props) => {
  const { stompClient, connect: defaultConnect } = useStompClient();
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

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (stompClient.current) {
        Stomp.subscribe(
          stompClient.current,
          CHAT_SOCKET_URL.subscribeURL(relationId),
          subscibeCallback
        );
      }
    },
    [stompClient, subscibeCallback]
  );

  const publish = useCallback(
    (messageRequest: MessageRequest) => {
      if (stompClient.current) {
        Stomp.publish(
          stompClient.current,
          CHAT_SOCKET_URL.publishURL(),
          messageRequest
        );
      }
    },
    [stompClient]
  );

  const connect = useCallback(
    (relationIds?: Friend["relationId"][]) => {
      const onConnect = () => {
        if (relationIds) {
          relationIds.forEach((relationId) => {
            subscribe(relationId);
            console.log(`${relationId}번 채팅 방 연결 성공`);
          });
        }
      };
      defaultConnect(onConnect);
    },
    [defaultConnect, subscribe]
  );

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
