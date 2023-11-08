import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import useRecommendationFriendsQuery from "@/hooks/queries/recommendation/useRecommendationFriendsQuery";
import styles from "@/styles/RecommendationPage.module.css";

const RecommendationPage = () => {
  const { data: recommendationFriends } = useRecommendationFriendsQuery();

  return (
    <div className={styles["recommendation-page"]}>
      {recommendationFriends && (
        <RecommendationList recommendations={recommendationFriends} />
      )}
    </div>
  );
};

export default RecommendationPage;
