import { FriendRequestContext } from "@/contexts/FriendRequestContext";
import { useContext, useEffect, useMemo, useState } from "react";
import useSocialFriendRequestsQuery from "./queries/social/useSocialFriendRequestsQuery";
import { Storage } from "@/utils/storage";

const useFriendRequest = () => {
  const context = useContext(FriendRequestContext);
  const { data: friendRequests } = useSocialFriendRequestsQuery();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setUserId(Storage.getUserId());
  }, []);

  const unreadFriendRequestCount = useMemo(() => {
    if (!userId) return;

    const newFriendRequestIds = context.friendRequestMessages
      .filter(({ receiveUserId }) => receiveUserId === userId)
      .map(({ requestUserId }) => requestUserId);

    if (friendRequests) {
      const friendRequestIds = friendRequests?.map(({ userId }) => userId);
      friendRequestIds.forEach(
        (id) =>
          !newFriendRequestIds.includes(id) && newFriendRequestIds.push(id)
      );
    }

    return newFriendRequestIds.length;
  }, [friendRequests, context.friendRequestMessages, userId]);

  return { ...context, unreadFriendRequestCount };
};

export default useFriendRequest;
