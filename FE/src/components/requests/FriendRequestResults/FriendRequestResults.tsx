import styles from "./FriendRequestResults.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useEffect, useMemo } from "react";
import { Storage } from "@/utils/storage";
import useSocialFriendIdsQuery from "@/hooks/queries/social/useSocialFriendIdsQuery";
import Nothing from "@/components/nothing/Nothing/Nothing";
import RequestList from "../RequestList/RequestList";

const FriendRequestResults = () => {
  const { data: friendIds } = useSocialFriendIdsQuery();
  const { data: friendsRequests, refetch } = useSocialFriendRequestsQuery();
  const { friendRequestMessages } = useFriendRequest();

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch, friendRequestMessages]);

  const sendFriendsRequests = useMemo(() => {
    return friendRequestMessages
      .filter(({ requestUserId }) => requestUserId === Storage.getUserId())
      .map(({ receiveUserId }) => receiveUserId);
  }, [friendRequestMessages]);

  const receiveFriendsRequests = useMemo(() => {
    if (!friendsRequests) {
      return undefined;
    }

    if (!friendRequestMessages.length && friendIds) {
      return friendRequestMessages
        .filter(
          ({ requestUserId, receiveUserId }) =>
            receiveUserId === Storage.getUserId() && !friendIds?.includes(requestUserId)
        )
        .map(({ requestUserId }) => requestUserId);
    }

    return friendRequestMessages.map(({ requestUserId }) => requestUserId);
  }, [friendIds, friendRequestMessages, friendsRequests]);

  if (!friendsRequests?.length) {
    return <Nothing>받은 친구 요청이 없습니다.</Nothing>;
  }

  return (
    <div className={styles["friend-requests"]}>
      {/* {sendFriendsRequests && <RequestList requestUserIds={sendFriendsRequests} />}
      {receiveFriendsRequests && <RequestList requestUserIds={receiveFriendsRequests} />} */}
    </div>
  );
};

export default FriendRequestResults;
