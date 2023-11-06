import React, { MouseEvent, useCallback, useMemo } from "react";
import Props from "@/types";
import { FriendRequest, RecommendationFriend } from "@/types/social";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationItem.module.css";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { useRouter } from "next/router";
import Button from "@/components/button/Button";
import useAcceptSocialFriendRequestMutation from "@/hooks/mutations/social/useAcceptSocialFriendRequestMutation";
import useDeclineSocialFriendRequestMutation from "@/hooks/mutations/social/useDeclineSocialFriendRequestMutation";

interface RecommendItemProps extends Props {
  item: FriendRequest | RecommendationFriend;
}

const RecommendationItem = ({ item, className }: RecommendItemProps) => {
  const router = useRouter();
  const { mutate: acceptFriendRequest } =
    useAcceptSocialFriendRequestMutation();
  const { mutate: declineFriendRequest } =
    useDeclineSocialFriendRequestMutation();

  const { isFriendRequest, onAccept, onDecline } = useMemo(() => {
    return {
      isFriendRequest: item.type === "friendRequest",
      onAccept: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        acceptFriendRequest(item.userId);
      },
      onDecline: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        declineFriendRequest(item.userId);
      },
    };
  }, [item, acceptFriendRequest, declineFriendRequest]);

  const onMoveProfilePage = useCallback(() => {
    router.push(`/profile/${item.userId}`);
  }, [router, item.userId]);

  return (
    <div
      className={classNameWrapper(className, styles["recommendation-item"])}
      onClick={onMoveProfilePage}
    >
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
        {isFriendRequest && (
          <div className={styles["recommendation-item__button"]}>
            <Button
              className={styles["recommendation-item__button--accept"]}
              onClick={onAccept}
            >
              수락
            </Button>
            <Button
              className={styles["recommendation-item__button--reject"]}
              onClick={onDecline}
            >
              거절
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationItem;
