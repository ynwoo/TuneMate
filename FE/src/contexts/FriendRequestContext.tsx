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
  publish: (
    userId: Friend["userId"],
    friendRequestMessage: FriendRequestMessage
  ) => void;
  friendRequestMessages: FriendRequestMessage[];
}

export const FriendRequestContext = createContext<FriendRequestContextState>(
  {} as FriendRequestContextState
);

const FriendRequestProvider = ({ children }: Props) => {
  const { stompClient, connect: defaultConnect } = useStompClient();
  const [friendRequestMessages, setFriendRequestMessages] = useState<
    FriendRequestMessage[]
  >([]);

  const { data: sendSocialFriendRequests } = useSendSocialFriendRequestsQuery();

  const subscibeCallback = useCallback(
    (data: any) => {
      console.log(data);

      // 새로운 chatroom
      const newFriendRequestMessage: FriendRequestMessage = JSON.parse(
        data.body
      );

      setFriendRequestMessages([
        ...friendRequestMessages,
        newFriendRequestMessage,
      ]);
    },
    [friendRequestMessages]
  );

  const subscribe = useCallback(
    (userId: Friend["friendId"]) => {
      if (stompClient.current) {
        Stomp.subscribe(
          stompClient.current,
          FRIEND_SOCKET_URL.subscribeURL(userId),
          subscibeCallback
        );
      }
    },
    [stompClient, subscibeCallback]
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
            console.log(`${userId}번 친구 요청 방 연결 성공`);
          });
        }
      };
      defaultConnect(onConnect);
    },
    [defaultConnect, subscribe]
  );

  useEffect(() => {
    if (connect && sendSocialFriendRequests) {
      const prevFriendIds = friendRequestMessages.map(
        ({ receiveUserId }) => receiveUserId
      );
      const newFriendIds = sendSocialFriendRequests.filter(
        (friendId) => !prevFriendIds.includes(friendId)
      );
      console.log("newFriendIds", newFriendIds);

      connect(newFriendIds);
    }
  }, [connect, friendRequestMessages, sendSocialFriendRequests]);

  return (
    <FriendRequestContext.Provider
      value={{ connect, subscribe, publish, friendRequestMessages }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};

export default FriendRequestProvider;
