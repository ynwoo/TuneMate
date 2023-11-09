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
      console.log(newChatRoom, chatRooms);
    },
    [chatRooms]
  );

  const connect = useCallback(
    (callback?: () => void) => {
      if (client.current) return;
      // 연결 성공 후 실행할 함수
      const onConnect = () => {
        console.log(myChatRooms);
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
      console.log(relationId, "subscribe 호출!!");

      const onSubscribe = () => {
        if (client.current) {
          Stomp.subscribe(client.current, relationId, subscibeCallback);
        }
      };

      // client 객체가 없으면 재 연결
      if (!client.current) {
        console.log("client 재생성");
        connect(onSubscribe);
      } else {
        // client 객체가 있으면 구독 신청
        onSubscribe();
      }
    },
    [connect, subscibeCallback]
  );

  const publish = useCallback(
    (messageRequest: MessageRequest) => {
      console.log(messageRequest, "publish 호출!!");

      const onPublish = () => {
        if (client.current) {
          Stomp.publish(client.current, messageRequest);
        }
      };

      if (!client.current) {
        connect(onPublish);
      } else {
        onPublish();
      }
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
