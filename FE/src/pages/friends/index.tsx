import FriendList from "@/components/friend/FriendList/FriendList";
import { Friend } from "@/types/social";
import styles from "@/styles/FriendsPage.module.css";
import useSocialFriendsQuery from "@/hooks/queries/social/useSocialFriendsQuery";

const data = [
  { freindId: "0", name: "ss1" },
  { freindId: "1", name: "ss2" },
  { freindId: "2", name: "ss3" },
  { freindId: "3", name: "ss4" },
  { freindId: "4", name: "ss5" },
  { freindId: "5", name: "ss6" },
] as Friend[];

const FriendsPage = () => {
  // const { data: friends } = useSocialFriendsQuery();
  const { data: friends } = { data };

  return (
    <div className={styles["friends-page"]}>
      {friends && <FriendList friends={friends} />}
    </div>
  );
};

export default FriendsPage;
