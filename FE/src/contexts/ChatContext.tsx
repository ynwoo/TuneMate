import { createContext, useCallback, useState, useEffect } from "react";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { Friend } from "@/types/social";
import { ChatRoom, MessageRequest } from "@/types/chat";
import useMyChatRoomsQuery from "@/hooks/queries/social/useMyChatRoomsQuery";
import useStompClient from "@/hooks/useStompClient";
import { CHAT_SOCKET_URL } from "@/constants/url";
import { MINUTE, SECOND } from "@/utils/time";
import useUserInfo from "@/hooks/useUserInfo";

export interface ChatContextState {
  connect: (relationIds?: number[]) => void;
  subscribe: (relationId: Friend["relationId"]) => void;
  unsubscribe: (relationId: Friend["relationId"]) => void;
  publish: (messageRequest: MessageRequest) => void;
  refreshChatRooms: (newChatRoom: ChatRoom) => void;
  chatRooms: ChatRoom[];
}

export const ChatContext = createContext<ChatContextState>(
  {} as ChatContextState
);

const ChatProvider = ({ children }: Props) => {
  const { stompClient, connect: defaultConnect } = useStompClient();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [subscribes, setSubscribes] = useState<number[]>([]);
  const { data: myChatRooms } = useMyChatRoomsQuery();
  const userInfo = useUserInfo();

  const refreshChatRooms = (newChatRoom: ChatRoom) => {
    // 기존에 있던 chatRoom을 newChatRomm값으로 변경
    setChatRooms((chatRooms) => [
      ...chatRooms.filter(
        ({ chatRoomId }) => chatRoomId !== newChatRoom.chatRoomId
      ),
      newChatRoom,
    ]);
  };

  const subscibeCallback = useCallback(
    (data: any) => {
      // 새로운 chatroom
      const newChatRoom: ChatRoom = JSON.parse(data.body);
      refreshChatRooms(newChatRoom);
    },
    [chatRooms]
  );

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (stompClient.current && !subscribes.includes(relationId)) {
        setSubscribes((subscribes) => [...subscribes, relationId]);
        Stomp.subscribe(
          stompClient.current,
          CHAT_SOCKET_URL.subscribeURL(relationId),
          subscibeCallback
        );
      }
    },
    [stompClient, subscibeCallback, subscribes, setSubscribes]
  );

  const unsubscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (stompClient.current && subscribes.includes(relationId)) {
        setSubscribes((subscribes) =>
          subscribes.filter((id) => id !== relationId)
        );
        Stomp.unsubscribe(
          stompClient.current,
          CHAT_SOCKET_URL.subscribeURL(relationId)
        );
      }
    },
    [stompClient, subscribes, setSubscribes]
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
          });
        }
      };
      defaultConnect(onConnect);
    },
    [defaultConnect, subscribe]
  );

  useEffect(() => {
    if (stompClient && subscribe && myChatRooms) {
      const relationIds = myChatRooms.map((id) => id);
      relationIds.forEach((relationId) => {
        subscribe(relationId);
      });
    }
  }, [subscribe, myChatRooms, stompClient]);

  useEffect(() => {
    return () => subscribes.forEach((subscribe) => unsubscribe(subscribe));
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (!subscribes.length || !publish) return;
  //     const messageRequest = {
  //       content: "",
  //       relationId: subscribes?.[0],
  //       senderName: userInfo?.name,
  //       senderNo: userInfo?.userId,
  //       time: "",
  //     };
  //     setTimeout(() => publish(messageRequest), SECOND);
  //   }, MINUTE);
  //   return () => clearInterval(timer);
  // }, [subscribes, publish]);

  return (
    <ChatContext.Provider
      value={{
        connect,
        subscribe,
        unsubscribe,
        publish,
        chatRooms,
        refreshChatRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
