import { Friend } from "@/types/social";
import useSocialFriendsQuery from "./useSocialFriendsQuery";
import { useMemo } from "react";

const useSocialFriendQuery = (friendId: Friend["friendId"]) => {
  const query = useSocialFriendsQuery();
  const data = useMemo(() => {
    return query.data?.find((friend) => friend.friendId === friendId);
  }, [query.data]);

  return { ...query, data };
};

export default useSocialFriendQuery;
