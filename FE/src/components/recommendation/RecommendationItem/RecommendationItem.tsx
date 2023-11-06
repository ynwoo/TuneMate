import React from "react";
import Props from "@/types";
import { RecommendationFriend } from "@/types/social";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationItem.module.css";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";

interface RecommendItemProps extends Props {
  item: RecommendationFriend;
}

const RecommendationItem = ({ item, className }: RecommendItemProps) => {
  return (
    <div className={classNameWrapper(className, styles["recommendation-item"])}>
      <div className={styles["recommendation-item__user"]}>
        <ProfileImage
          className={styles["recommendation-item__user--image"]}
          src="https://i.scdn.co/image/ab67757000003b824e172b7776591b79a63fcea9"
          alt="내 프로필"
          type="recommendation"
        />
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
