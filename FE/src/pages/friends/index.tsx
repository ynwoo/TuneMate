import FriendList from "@/components/friend/FriendList/FriendList";
import { Friend } from "@/types/social";

const initData = [
  { freindId: "0", name: "ss1" },
  { freindId: "1", name: "ss2" },
  { freindId: "2", name: "ss3" },
  { freindId: "3", name: "ss4" },
  { freindId: "4", name: "ss5" },
  { freindId: "5", name: "ss6" },
] as Friend[];

const FriendsPage = () => {
  return (
    <div className="friends-page">
      <FriendList friends={initData} />
    </div>
  );
};

export default FriendsPage;
