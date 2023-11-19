import styles from "./FriendRequestResults.module.css";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useMemo } from "react";
import Nothing from "@/components/nothing/Nothing/Nothing";
import RequestList from "../RequestList/RequestList";
import useUserInfo from "@/hooks/useUserInfo";

const FriendRequestResults = () => {
  const { friendRequestMessages } = useFriendRequest();
  const userInfo = useUserInfo();

  const sendFriendsRequests = useMemo(() => {
    return friendRequestMessages
      .filter(({ requestUserId }) => requestUserId === userInfo?.userId)
      .map(({ receiveUserId }) => ({ userId: receiveUserId }));
  }, [friendRequestMessages]);

  if (!sendFriendsRequests?.length) {
    return <Nothing>받은 알림이 없습니다.</Nothing>;
  }

  return (
    <div className={styles["friend-request-results"]}>
      {sendFriendsRequests && (
        <RequestList
          className={styles["friend-request-results__request-list"]}
          items={sendFriendsRequests}
        />
      )}
    </div>
  );
};

export default FriendRequestResults;
