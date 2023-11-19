import styles from "./FriendRequests.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import { MouseEvent, useCallback, useState } from "react";
import Nothing from "@/components/nothing/Nothing/Nothing";
import useAcceptSocialFriendRequestMutation from "@/hooks/mutations/social/useAcceptSocialFriendRequestMutation";
import useDeclineSocialFriendRequestMutation from "@/hooks/mutations/social/useDeclineSocialFriendRequestMutation";
import { UserInfo } from "@/types/user";
import RequestList from "../RequestList/RequestList";
import Confirm from "@/components/modal/Confirm";
import useModal from "@/hooks/useModal";

const FriendRequests = () => {
  const { data: friendsRequests } = useSocialFriendRequestsQuery();
  const { mutate: acceptFriendRequest } = useAcceptSocialFriendRequestMutation();
  const { mutate: declineFriendRequest } = useDeclineSocialFriendRequestMutation();
  const [userId, setUserId] = useState<string>("");
  const acceptModal = useModal();
  const declineModal = useModal();

  const onAccept = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      acceptFriendRequest(userId);
    },
    [acceptFriendRequest, userId]
  );

  const onDecline = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      declineFriendRequest(userId);
    },
    [declineFriendRequest, userId]
  );

  const onAcceptModal = useCallback(
    (userId: UserInfo["userId"]) => {
      acceptModal.openToggle();
      setUserId(userId);
    },
    [acceptModal]
  );

  const onDeclineModal = useCallback(
    (userId: UserInfo["userId"]) => {
      declineModal.openToggle();
      setUserId(userId);
    },
    [declineModal]
  );

  if (!friendsRequests?.length) {
    return <Nothing>받은 친구 요청이 없습니다.</Nothing>;
  }

  return (
    <>
      <div className={styles["friend-requests"]}>
        {friendsRequests && (
          <RequestList
            className={styles["friend-requests__request-list"]}
            items={friendsRequests}
            onAccept={onAcceptModal}
            onDecline={onDeclineModal}
          />
        )}
      </div>
      <Confirm
        isOpen={acceptModal.isOpen}
        closeToggle={acceptModal.closeToggle}
        modalMessage="친구요청을 수락하시겠습니까?"
        onClick={onAccept}
      />
      <Confirm
        isOpen={declineModal.isOpen}
        closeToggle={declineModal.closeToggle}
        modalMessage="친구요청을 거절하시겠습니까?"
        onClick={onDecline}
      />
    </>
  );
};

export default FriendRequests;
