import { createContext, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { Friend } from "@/types/social";
import { MessageRequest } from "@/types/chat";

export interface ChatContextState {
  connect: () => void;
  subscribe: (relationId: Friend["relationId"]) => void;
  publish: (messageRequest: MessageRequest) => void;
}

export const ChatContext = createContext<ChatContextState>(
  {} as ChatContextState
);

type ChatProvider = Props;

const ChatProvider = ({ children }: ChatProvider) => {
  const client = useRef<Client | undefined>(undefined);

  const connect = useCallback(() => {
    if (client.current) return;
    Stomp.connect(client.current);
  }, []);

  const subscribe = useCallback(
    (relationId: Friend["relationId"]) => {
      if (!client.current) {
        connect();
      }

      if (client.current) {
        const callback = (data: any) => {
          console.log(data);
        };
        Stomp.subscribe(client.current, relationId, callback);
      }
    },
    [connect]
  );

  const publish = useCallback(
    (messageRequest: MessageRequest) => {
      if (!client.current) {
        connect();
      }

      if (client.current) {
        Stomp.publish(client.current, messageRequest);
      }
    },
    [connect]
  );

  return (
    <ChatContext.Provider value={{ connect, subscribe, publish }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
