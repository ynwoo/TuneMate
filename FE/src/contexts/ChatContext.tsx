import { createContext, useRef, useCallback, useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { Friend } from "@/types/social";
import { ChatRoom, MessageRequest } from "@/types/chat";
import useMyChatRoomsQuery from "@/hooks/queries/social/useMyChatRoomsQuery";

export interface ChatContextState {
  connect: () => void;
  subscribe: (relationId: Friend["relationId"]) => void;
  publish: (messageRequest: MessageRequest) => void;
  chatRooms: ChatRoom[];
}

export const ChatContext = createContext<ChatContextState>(
  {} as ChatContextState
);

type ChatProvider = Props;

let isSubscribe = false;

const ChatProvider = ({ children }: ChatProvider) => {
  const client = useRef<Client | undefined>(undefined);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { data: myChatRooms } = useMyChatRoomsQuery();

  const subscibeCallback = useCallback(
    (data: any) => {
      const newChatRoom: ChatRoom = JSON.parse(data.body);
      const prevChatRoom = chatRooms.find(
        ({ chatRoomId }) => chatRoomId === newChatRoom.chatRoomId
      );

      if (prevChatRoom) {
        const newChatRooms = chatRooms.map((chatRoom) =>
          newChatRoom.chatRoomId === chatRoom.chatRoomId
            ? newChatRoom
            : chatRoom
        );
        setChatRooms(newChatRooms);
        return;
      }
      setChatRooms([...chatRooms, newChatRoom]);
    },
    [chatRooms]
  );

  const connect = useCallback(
    (callback?: () => void) => {
      if (client.current) return;
      // 연결 성공 후 실행할 함수
      const onConnect = () => {
        // 연결해야할 채팅 방 전부 구독 신청
        if (myChatRooms) {
          myChatRooms.forEach((relationId) => {
            if (client.current) {
              Stomp.subscribe(client!.current, relationId, subscibeCallback);
            }
          });
        }

        // parameter로 전달 받은 함수 실행
        if (callback) {
          callback();
        }
      };
      client.current = Stomp.connect(onConnect);
    },
    [myChatRooms, subscibeCallback]
  );

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      const onSubscribe = () => {
        if (client.current) {
          Stomp.subscribe(client.current, relationId, subscibeCallback);
        }
      };

      // client 객체가 없으면 재 연결
      if (!client.current) {
        connect(onSubscribe);
        return;
      }

      // client 객체가 있으면 구독 신청
      onSubscribe();
    },
    [connect, subscibeCallback]
  );

  const publish = useCallback(
    (messageRequest: MessageRequest) => {
      const onPublish = () => {
        if (client.current) {
          Stomp.publish(client.current, messageRequest);
        }
      };

      if (!client.current) {
        connect(onPublish);
        return;
      }

      onPublish();
    },
    [connect]
  );

  useEffect(() => {
    if (client.current && myChatRooms && !isSubscribe) {
      isSubscribe = true;
      myChatRooms.forEach((chatRoomId) => subscribe(chatRoomId));
    }
  }, [myChatRooms, subscribe, client]);

  return (
    <ChatContext.Provider value={{ connect, subscribe, publish, chatRooms }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
