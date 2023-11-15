import { FRIEND_SOCKET_URL } from "@/constants/url";
import useSendSocialFriendRequestsQuery from "@/hooks/queries/social/useSendSocialFriendRequestsQuery";
import useStompClient from "@/hooks/useStompClient";
import Props from "@/types";
import { Friend, FriendRequestMessage } from "@/types/social";
import { Stomp } from "@/utils/stomp";
import { createContext, useCallback, useState, useEffect } from "react";

export interface FriendRequestContextState {
  connect: (userIds?: string[]) => void;
  subscribe: (userId: Friend["friendId"]) => void;
  unsubscribe: (userId: Friend["friendId"]) => void;
  publish: (userId: Friend["userId"], friendRequestMessage: FriendRequestMessage) => void;
  friendRequestMessages: FriendRequestMessage[];
}

export const FriendRequestContext = createContext<FriendRequestContextState>(
  {} as FriendRequestContextState
);

const FriendRequestProvider = ({ children }: Props) => {
  const { stompClient, connect: defaultConnect } = useStompClient();
  const [subscribes, setSubscribes] = useState<string[]>([]);
  const [friendRequestMessages, setFriendRequestMessages] = useState<FriendRequestMessage[]>([]);

  const { data: sendSocialFriendRequests } = useSendSocialFriendRequestsQuery();

  const subscibeCallback = useCallback(
    (data: any) => {
      console.log(data);

      // 새로운 chatroom
      const newFriendRequestMessage: FriendRequestMessage = JSON.parse(data.body);

      setFriendRequestMessages([...friendRequestMessages, newFriendRequestMessage]);
    },
    [friendRequestMessages]
  );

  const subscribe = useCallback(
    (userId: Friend["friendId"]) => {
      if (stompClient.current && !subscribes.includes(userId)) {
        setSubscribes((subscribes) => [...subscribes, userId]);
        Stomp.subscribe(
          stompClient.current,
          FRIEND_SOCKET_URL.subscribeURL(userId),
          subscibeCallback
        );
      }
    },
    [stompClient, subscibeCallback, subscribes, setSubscribes]
  );

  const unsubscribe = useCallback(
    (userId: Friend["friendId"]) => {
      if (stompClient.current && subscribes.includes(userId)) {
        setSubscribes((subscribes) => [...subscribes, userId]);
        Stomp.unsubscribe(stompClient.current, FRIEND_SOCKET_URL.subscribeURL(userId));
      }
    },
    [stompClient, subscribes, setSubscribes]
  );

  const publish = useCallback(
    (userId: Friend["userId"], friendRequestMessage: FriendRequestMessage) => {
      if (stompClient.current) {
        Stomp.publish(
          stompClient.current,
          FRIEND_SOCKET_URL.publishURL(userId),
          friendRequestMessage
        );
      }
    },
    [stompClient]
  );

  const connect = useCallback(
    (userIds?: string[]) => {
      const onConnect = () => {
        if (userIds) {
          userIds.forEach((userId) => {
            subscribe(userId);
          });
        }
      };
      defaultConnect(onConnect);
    },
    [defaultConnect, subscribe]
  );

  useEffect(() => {
    if (stompClient && subscribe && sendSocialFriendRequests) {
      const timer = setTimeout(() => {
        const friendIds = sendSocialFriendRequests.map((id) => id);
        friendIds.forEach((userId) => {
          subscribe(userId);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [subscribe, sendSocialFriendRequests, stompClient]);

  useEffect(() => {
    return () => subscribes.forEach((subscribe) => unsubscribe(subscribe));
  }, []);

  return (
    <FriendRequestContext.Provider
      value={{ connect, subscribe, unsubscribe, publish, friendRequestMessages }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};

export default FriendRequestProvider;
