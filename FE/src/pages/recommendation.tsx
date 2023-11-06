import RecommendationList from "@/components/recommendation/RecommendationList/RecommendationList";
import { RecommendationFriend } from "@/types/social";

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
  return (
    <div>
      <RecommendationList recommendations={data} />
    </div>
  );
};

export default RecommendationPage;
