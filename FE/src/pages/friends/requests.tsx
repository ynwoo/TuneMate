import styles from "@/styles/FriendsRequestsPage.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";

const FriendsRequests = () => {
  const { data: friendsRequests } = useSocialFriendRequestsQuery();

  return (
    <div className={styles["friends-requests-page"]}>
      {friendsRequests && (
        <RecommendationList recommendations={friendsRequests} />
      )}
    </div>
  );
};

export default FriendsRequests;
