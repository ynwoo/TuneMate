import { FriendRequest } from "@/types/social";
import styles from "@/styles/FriendsRequestsPage.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";

const data = [
  { userId: "aaaaaaaaaaaaaaaa1", name: "aa1", type: "friendRequest" },
  { userId: "bbbbbbbbbb", name: "aa2", type: "friendRequest" },
  { userId: "cccccccccccccc", name: "aa3", type: "friendRequest" },
  { userId: "aa4", name: "aa4", type: "friendRequest" },
  { userId: "aa5", name: "aa5", type: "friendRequest" },
  { userId: "bbbbbbbbbb", name: "aa2", type: "friendRequest" },
  { userId: "cccccccccccccc", name: "aa3", type: "friendRequest" },
  { userId: "aa4", name: "aa4", type: "friendRequest" },
  { userId: "aa5", name: "aa5", type: "friendRequest" },
] as FriendRequest[];

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
