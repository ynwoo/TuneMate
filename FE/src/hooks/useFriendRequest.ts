import { FriendRequestContext } from "@/contexts/FriendRequestContext";
import { useContext, useMemo } from "react";
import useSocialFriendRequestsQuery from "./queries/social/useSocialFriendRequestsQuery";
import { Storage } from "@/utils/storage";

const useFriendRequest = () => {
  const context = useContext(FriendRequestContext);
  const { data: friendRequests } = useSocialFriendRequestsQuery();
  const unreadFriendRequestCount = useMemo(() => {
    const userId = Storage.getUserId();
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
  }, [friendRequests, context.friendRequestMessages]);

  return { ...context, unreadFriendRequestCount };
};

export default useFriendRequest;
