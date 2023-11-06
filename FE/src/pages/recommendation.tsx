import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import useRecommendationFriendsQuery from "@/hooks/queries/recommendation/useRecommendationFriendsQuery";
import { RecommendationFriend } from "@/types/social";
import styles from "@/styles/RecommendationPage.module.css";

const data: RecommendationFriend[] = [
  { userId: "0", name: "a" },
  { userId: "1", name: "b" },
  { userId: "2", name: "c" },
  { userId: "3", name: "d" },
  { userId: "4", name: "e" },
  { userId: "6", name: "b" },
  { userId: "7", name: "c" },
  { userId: "8", name: "d" },
  { userId: "9", name: "e" },
] as RecommendationFriend[];

const RecommendationPage = () => {
  // const { data: recommendationFriends } = useRecommendationFriendsQuery();
  const { data: recommendationFriends } = { data };

  return (
    <div className={styles["recommendation-page"]}>
      {recommendationFriends && (
        <RecommendationList recommendations={recommendationFriends} />
      )}
    </div>
  );
};

export default RecommendationPage;
