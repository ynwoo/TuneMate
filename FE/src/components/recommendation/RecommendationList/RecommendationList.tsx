import React from "react";
import Props from "@/types";
import { FriendRequest, RecommendationFriend } from "@/types/social";
import RecommendationItem from "../RecommendationItem/RecommendationItem";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationList.module.css";

interface RecommendListProps extends Props {
  recommendations: (FriendRequest | RecommendationFriend)[];
}

const RecommendationList = ({
  recommendations,
  className,
}: RecommendListProps) => {
  return (
    <div className={styles["body"]}>
      <ul
        className={classNameWrapper(className, styles["recommendation-list"])}
      >
        {recommendations.map((recommendation) => (
          <RecommendationItem
            key={recommendation.userId}
            className={styles["recommendation-list__item"]}
            item={recommendation}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;
