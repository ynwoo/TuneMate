import FriendList from "@/components/friend/FriendList/FriendList";
import styles from "@/styles/FriendsPage.module.css";
import useSocialFriendsQuery from "@/hooks/queries/social/useSocialFriendsQuery";
import Nothing from "@/components/nothing/Nothing/Nothing";

const FriendsPage = () => {
  const { data: friends } = useSocialFriendsQuery();

  if (!friends?.length) {
    return <Nothing className={styles["nothing"]}>친구가 존재하지 않습니다.</Nothing>;
  }

  return (
    <div className={styles["friends-page"]}>
      {friends && <FriendList className={styles["friends-page__friend-list"]} friends={friends} />}
    </div>
  );
};

export default FriendsPage;
