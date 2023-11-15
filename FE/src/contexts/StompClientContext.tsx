import { createContext, MutableRefObject, useCallback, useRef, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import Props from "@/types";
import { Stomp } from "@/utils/stomp";
import { CHAT_SOCKET_URL } from "@/constants/url";

export interface StompContextState {
  stompClient: MutableRefObject<Client | undefined>;
  connect: (onConnect: () => void) => void;
  disconnect: () => void;
}

export const StompClientContext = createContext<StompContextState>({} as StompContextState);

type StompClientProviderProps = Props;

const StompClientProvider = ({ children }: StompClientProviderProps) => {
  const stompClient = useRef<Client | undefined>(undefined);

  const connect = useCallback(
    (onConnect: () => void) => {
      Stomp.connect(stompClient, CHAT_SOCKET_URL.brokerURL(), onConnect);
    },
    [stompClient]
  );

  const disconnect = useCallback(() => {
    if (stompClient.current) {
      Stomp.disconnect(stompClient.current);
      stompClient.current = undefined;
    }
  }, [stompClient]);

  useEffect(() => {
    connect(() => {
      console.log("client 생성!!");
    });
    return disconnect;
  }, []);

  return (
    <StompClientContext.Provider value={{ stompClient, connect, disconnect }}>
      {children}
    </StompClientContext.Provider>
  );
};

export default StompClientProvider;
