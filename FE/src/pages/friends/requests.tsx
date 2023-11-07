import { FriendRequest } from "@/types/social";
import styles from "@/styles/FriendsRequestsPage.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";

const data = [
  { userId: "aa1", name: "aa1", type: "friendRequest" },
  { userId: "aa2", name: "aa2", type: "friendRequest" },
  { userId: "aa3", name: "aa3", type: "friendRequest" },
  { userId: "aa4", name: "aa4", type: "friendRequest" },
  { userId: "aa5", name: "aa5", type: "friendRequest" },
] as FriendRequest[];

const FriendsRequests = () => {
  const { data: friendsRequests } = useSocialFriendRequestsQuery();
  // const { data: friendsRequests } = { data };
  return (
    <div className={styles["friends-requests-page"]}>
      {friendsRequests && <RecommendationList recommendations={data} />}
    </div>
  );
};

export default FriendsRequests;
