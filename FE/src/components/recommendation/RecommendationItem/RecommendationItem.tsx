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
import Icon from "@/components/icons";
import ButtonWithModal from "@/components/button/ButtonWithModal";
import useSendSocialFriendRequestMutation from "@/hooks/mutations/social/useSendSocialFriendRequestMutation";

interface RecommendItemProps extends Props {
  item: FriendRequest | RecommendationFriend;
}

const RecommendationItem = ({ item, className }: RecommendItemProps) => {
  const router = useRouter();
  const { mutate: acceptFriendRequest } = useAcceptSocialFriendRequestMutation();
  const { mutate: declineFriendRequest } = useDeclineSocialFriendRequestMutation();
  const { mutate: sendSocialFriendRequest } = useSendSocialFriendRequestMutation();

  const { isFriendRequest, onAccept, onDecline } = useMemo(() => {
    const isFriendRequest = item.musicalTasteSimilarity ? true : false;
    const onAccept = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (isFriendRequest) {
        // 친구 요청 수락
        acceptFriendRequest(item.userId);
      } else {
        const { userId, distance, musicalTasteSimilarity } = item;

        // 친구 요청 보내기
        // TODO: 친구 요청 중복 제거 구현 필요
        sendSocialFriendRequest({
          userId,
          distance: distance,
          musicalTasteSimilarity: String(musicalTasteSimilarity),
        });
      }
    };
    const onDecline = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      declineFriendRequest(item.userId);
    };
    return {
      isFriendRequest,
      onAccept,
      onDecline,
    };
  }, [item, acceptFriendRequest, declineFriendRequest, sendSocialFriendRequest]);

  console.log(isFriendRequest);

  const onMoveProfilePage = useCallback(() => {
    router.push(`/profile/${item.userId}`);
  }, [router, item.userId]);

  return (
    <div className={styles["body"]}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <li
          className={classNameWrapper(className, styles["recommendation-item"])}
          onClick={onMoveProfilePage}
        >
          <div>
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
            <div className={styles["recommendation-item__ratio"]}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", marginLeft: "4px", flex: 1, padding: "1em 0.5em" }}>
                  <Icon.Music size="lg" />
                  <div style={{ display: "flex", marginLeft: "4px" }}>
                    {(
                      Number(isFriendRequest ? item.musicalTasteSimilarity : item.similarity) * 100
                    ).toFixed(0)}
                  </div>
                </div>

                {!isFriendRequest && (
                  <ButtonWithModal
                    className={styles["recommendation-item__button-item"]}
                    onClick={onAccept}
                    modalMessage="친구요청을 보내시겠습니까?"
                    color="white"
                  >
                    <Icon.Recommendation size="lg" />
                  </ButtonWithModal>
                )}
                {isFriendRequest && (
                  <div className={styles["recommendation-item__button-container"]}>
                    <ButtonWithModal
                      className={styles["recommendation-item__button-item"]}
                      onClick={onAccept}
                      modalMessage="수락하시겠습니까?"
                      color="blue"
                    >
                      수락
                    </ButtonWithModal>
                    <Button
                      className={styles["recommendation-item__button-item"]}
                      onClick={onDecline}
                      color="red"
                    >
                      거절
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default RecommendationItem;
