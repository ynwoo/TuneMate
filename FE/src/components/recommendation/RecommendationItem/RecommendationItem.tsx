import React, { MouseEvent, useCallback, useMemo } from "react";
import Props from "@/types";
import { FriendRequest, RecommendationFriend } from "@/types/social";
import { classNameWrapper } from "@/utils/className";
import styles from "./RecommendationItem.module.css";
import ProfileImage from "@/components/image/ProfileImage/ProfileImage";
import { useRouter } from "next/router";
import Icon from "@/components/icons";
import useSendSocialFriendRequestMutation from "@/hooks/mutations/social/useSendSocialFriendRequestMutation";
import useModal from "@/hooks/useModal";
import Confirm from "@/components/modal/Confirm";

interface RecommendItemProps extends Props {
  item: FriendRequest | RecommendationFriend;
}

const RecommendationItem = ({ item, className }: RecommendItemProps) => {
  const router = useRouter();
  const { mutate: sendSocialFriendRequest } = useSendSocialFriendRequestMutation();
  const { isOpen, closeToggle, openToggle } = useModal();
  const onAccept = useMemo(() => {
    const onAccept = () => {
      const { userId, distance, similarity } = item;

      // 친구 요청 보내기
      sendSocialFriendRequest({
        userId,
        distance: distance,
        musicalTasteSimilarity: String(similarity),
      });
    };
    return onAccept;
  }, [item, sendSocialFriendRequest]);

  const onMoveProfilePage = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      router.push(`/profile/${item.userId}`);
    },
    [router, item.userId]
  );

  return (
    <>
      <div className={styles["body"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <li
            className={classNameWrapper(className, styles["recommendation-item"])}
            onClick={onMoveProfilePage}
          >
            <div className={styles["recommendation-item__user"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "8px",
                }}
              >
                <ProfileImage
                  className={styles["recommendation-item__user--image"]}
                  src={item.img ?? "/favicon.ico"}
                  alt="내 프로필"
                  type="recommendation"
                />
                <p className={styles["recommendation-item__user--name"]}>{item.name}</p>
              </div>
            </div>
            <div className={styles["recommendation-item__info"]}>
              <div className={styles["recommendation-item__info--ratio"]}>
                <div>
                  <Icon.Music size="lg" />
                </div>
                <p className={styles["recommendation-item__info--ratio-text"]}>
                  {(Number(item.similarity) * 100).toFixed(0)}
                </p>
              </div>
              <div className={styles["recommendation-item__info--button"]} onClick={openToggle}>
                <Icon.Recommendation size="lg" />
              </div>
            </div>
          </li>
        </div>
      </div>
      <Confirm
        modalMessage="친구 요청을 보내시겠습니까?"
        onClick={onAccept}
        closeToggle={closeToggle}
        isOpen={isOpen}
      />
    </>
  );
};

export default RecommendationItem;
