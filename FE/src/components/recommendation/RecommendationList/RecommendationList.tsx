import React from "react";
import Props from "@/types";
import { RecommendationFriend } from "@/types/social";
import RecommendationItem from "../RecommendationItem/RecommendationItem";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationList.module.css";

interface RecommendListProps extends Props {
  recommendations: RecommendationFriend[];
}

const RecommendationList = ({
  recommendations,
  className,
}: RecommendListProps) => {
  return (
    <div className={classNameWrapper(className, styles["recommendation-list"])}>
      {recommendations.map((recommendation) => (
        <RecommendationItem
          key={recommendation.userId}
          className={styles["recommendation-list__item"]}
          item={recommendation}
        />
      ))}
    </div>
  );
};

export default RecommendationList;
