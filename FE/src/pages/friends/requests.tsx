import styles from "@/styles/FriendsRequestsPage.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useMemo } from "react";
import { Storage } from "@/utils/storage";
import useSocialFriendIdsQuery from "@/hooks/queries/social/useSocialFriendIdsQuery";

const FriendsRequests = () => {
  const { data: friendIds } = useSocialFriendIdsQuery();
  const { data: friendsRequests } = useSocialFriendRequestsQuery();
  const { friendRequestMessages } = useFriendRequest();

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
          receiveUserId === Storage.getUserId() &&
          !friendIds?.includes(requestUserId)
      );
    }

    return friendRequestMessages;
  }, [friendIds, friendRequestMessages, friendsRequests]);

  return (
    <div className={styles["friends-requests-page"]}>
      {friendsRequests && (
        <RecommendationList recommendations={friendsRequests} />
      )}
    </div>
  );
};

export default FriendsRequests;
