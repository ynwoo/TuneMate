import React from "react";
import Props from "@/types";
import { RecommendationFriend } from "@/types/social";
import RecommendationItem from "../RecommendationItem/RecommendationItem";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationList.module.css";

interface RecommendListProps extends Props {
  recommendations: RecommendationFriend[];
}

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

const RecommendationList = ({
  recommendations,
  className,
}: RecommendListProps) => {
  return (
    <div className={classNameWrapper(className, styles["recommendation-list"])}>
      {recommendations.map((recommendation) => (
        <RecommendationItem key={recommendation.userId} item={recommendation} />
      ))}
    </div>
  );
};

export default RecommendationList;
