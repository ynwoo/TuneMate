import React from "react";
import Props from "@/types";
import { RecommendationFriend } from "@/types/social";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationItem.module.css";

interface RecommendItemProps extends Props {
  item: RecommendationFriend;
}

const RecommendationItem = ({ item, className }: RecommendItemProps) => {
  return (
    <div className={classNameWrapper(className, styles["recommendation-item"])}>
      <div className={styles["recommendation-item__user"]}>
        <p className={styles["recommendation-item__user--image"]}>프사</p>
        <p className={styles["recommendation-item__user--name"]}>{item.name}</p>
      </div>
      <div className={styles["recommendation-item__ratio"]}>
        <p>거리</p>
        <p>유사도</p>
      </div>
    </div>
  );
};

export default RecommendationItem;
