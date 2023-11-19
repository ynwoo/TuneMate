import styles from "./FriendRequests.module.css";
import useSocialFriendRequestsQuery from "@/hooks/queries/social/useSocialFriendRequestsQuery";
import { useCallback, useMemo } from "react";
import Nothing from "@/components/nothing/Nothing/Nothing";
import useAcceptSocialFriendRequestMutation from "@/hooks/mutations/social/useAcceptSocialFriendRequestMutation";
import useDeclineSocialFriendRequestMutation from "@/hooks/mutations/social/useDeclineSocialFriendRequestMutation";
import { UserInfo } from "@/types/user";
import RequestList from "../RequestList/RequestList";

const FriendRequests = () => {
  const { data: friendsRequests } = useSocialFriendRequestsQuery();
  const { mutate: acceptFriendRequest } = useAcceptSocialFriendRequestMutation();
  const { mutate: declineFriendRequest } = useDeclineSocialFriendRequestMutation();

  const onAccept = useCallback(
    (userId: UserInfo["userId"]) => {
      acceptFriendRequest(userId);
    },
    [acceptFriendRequest]
  );

  const onDecline = useCallback(
    (userId: UserInfo["userId"]) => {
      declineFriendRequest(userId);
    },
    [declineFriendRequest]
  );

  //   if (!friendsRequests?.length) {
  //     return <Nothing>받은 친구 요청이 없습니다.</Nothing>;
  //   }

  const items = [
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
    {
      name: "노태균",
      userId: "cb899bc8-33a9-43a6-938c-76b0ec286c77",
    },
  ];
  return (
    <div className={styles["friend-requests"]}>
      <RequestList
        className={styles["friend-requests__request-list"]}
        items={items}
        onAccept={onAccept}
        onDecline={onDecline}
      />
      {friendsRequests && (
        <RequestList items={friendsRequests} onAccept={onAccept} onDecline={onDecline} />
      )}
    </div>
  );
};

export default FriendRequests;
