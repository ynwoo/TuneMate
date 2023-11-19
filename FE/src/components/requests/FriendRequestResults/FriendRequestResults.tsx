import styles from "./FriendRequestResults.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useEffect, useMemo } from "react";
import { Storage } from "@/utils/storage";
import useSocialFriendIdsQuery from "@/hooks/queries/social/useSocialFriendIdsQuery";
import Nothing from "@/components/nothing/Nothing/Nothing";

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
    return friendRequestMessages.filter(
      ({ requestUserId }) => requestUserId === Storage.getUserId()
    );
  }, [friendRequestMessages]);

  const receiveFriendsRequests = useMemo(() => {
    if (!friendsRequests) {
      return undefined;
    }

    if (!friendRequestMessages.length && friendIds) {
      return friendRequestMessages.filter(
        ({ requestUserId, receiveUserId }) =>
          receiveUserId === Storage.getUserId() && !friendIds?.includes(requestUserId)
      );
    }

    return friendRequestMessages;
  }, [friendIds, friendRequestMessages, friendsRequests]);

  if (!friendsRequests?.length) {
    return <Nothing>받은 친구 요청이 없습니다.</Nothing>;
  }

  return (
    <div className={styles["friend-requests"]}>
      {friendsRequests && <RecommendationList recommendations={friendsRequests} />}
    </div>
  );
};

export default FriendRequestResults;
