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

  const connect = useCallback(() => {
    if (client.current) return;
    client.current = Stomp.connect();
  }, []);

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (!client.current) {
        connect();
      }

      if (client.current) {
        const callback = (data: any) => {
          const newChatRoom = JSON.parse(data.body);
          const newChatRooms = chatRooms.filter(
            ({ chatRoomId }) => newChatRoom.chatRoomId !== chatRoomId
          );
          newChatRooms.push(newChatRoom);
          setChatRooms(newChatRooms);
        };
        // if (myChatRooms) {
        //   myChatRooms.forEach((relationId) =>
        //     Stomp.subscribe(client.current, relationId, callback)
        //   );
        // }
        Stomp.subscribe(client.current, relationId, callback);
      }
    },
    [connect, setChatRooms, chatRooms]
  );

  const publish = useCallback(
    (messageRequest: MessageRequest) => {
      console.log("publish", client.current);
      if (!client.current) {
        connect();
      }

      if (client.current) {
        Stomp.publish(client.current, messageRequest);
      }
    },
    [connect]
  );

  // useEffect(() => {
  //   connect();
  // }, [connect]);

  // useEffect(() => {
  //   if (client.current && myChatRooms && !isSubscribe) {
  //     isSubscribe = true;
  //     myChatRooms.forEach((chatRoomId) => subscribe(chatRoomId));
  //   }
  // }, [myChatRooms, subscribe, client]);

  return (
    <ChatContext.Provider value={{ connect, subscribe, publish, chatRooms }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
