import Nothing from "@/components/nothing/Nothing/Nothing";
import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import useRecommendationFriendsQuery from "@/hooks/queries/recommendation/useRecommendationFriendsQuery";
import styles from "@/styles/RecommendationPage.module.css";

const RecommendationFriendsPage = () => {
  const { data: recommendationFriends } = useRecommendationFriendsQuery();

  if (!recommendationFriends?.length) {
    return <Nothing className={styles["nothing"]}>추천 친구가 존재하지 않습니다.</Nothing>;
  }

  return (
    <div className={styles["recommendation-page"]}>
      {recommendationFriends && <RecommendationList recommendations={recommendationFriends} />}
    </div>
  );
};

export default RecommendationFriendsPage;
