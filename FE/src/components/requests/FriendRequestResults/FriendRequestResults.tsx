import styles from "./FriendRequestResults.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useEffect, useMemo } from "react";
import { Storage } from "@/utils/storage";
import useSocialFriendIdsQuery from "@/hooks/queries/social/useSocialFriendIdsQuery";
import Nothing from "@/components/nothing/Nothing/Nothing";
import RequestList from "../RequestList/RequestList";
import useUserInfo from "@/hooks/useUserInfo";

const FriendRequestResults = () => {
  const { data: friendIds } = useSocialFriendIdsQuery();
  const { data: friendsRequests, refetch } = useSocialFriendRequestsQuery();
  const { friendRequestMessages } = useFriendRequest();
  const userInfo = useUserInfo();

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch, friendRequestMessages]);

  const sendFriendsRequests = useMemo(() => {
    return friendRequestMessages
      .filter(({ requestUserId }) => requestUserId === userInfo?.userId)
      .map(({ receiveUserId }) => ({ userId: receiveUserId }));
  }, [friendRequestMessages]);

  const receiveFriendsRequests = useMemo(() => {
    if (!friendsRequests) {
      return undefined;
    }

    if (!friendRequestMessages.length && friendIds) {
      return friendRequestMessages
        .filter(
          ({ requestUserId, receiveUserId }) =>
            receiveUserId === userInfo?.userId && !friendIds?.includes(requestUserId)
        )
        .map(({ requestUserId }) => ({ userId: requestUserId }));
    }

    return friendRequestMessages.map(({ requestUserId }) => ({ userId: requestUserId }));
  }, [friendIds, friendRequestMessages, friendsRequests]);

  const items = useMemo(() => {
    return friendRequestMessages
      .filter(
        ({ requestUserId, receiveUserId }) =>
          requestUserId === userInfo?.userId || receiveUserId === userInfo?.userId
      )
      .map(({ receiveUserId }) => ({ userId: receiveUserId }));
  }, []);

  if (!sendFriendsRequests?.length && !receiveFriendsRequests?.length) {
    return <Nothing>받은 알림이 없습니다.</Nothing>;
  }

  return (
    <div className={styles["friend-requests"]}>
      {sendFriendsRequests && <RequestList items={sendFriendsRequests} />}
      {receiveFriendsRequests && <RequestList items={receiveFriendsRequests} />}
      {items && <RequestList items={items} />}
    </div>
  );
};

export default FriendRequestResults;
