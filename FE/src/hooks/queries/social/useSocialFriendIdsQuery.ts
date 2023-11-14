import { getSocialFriends } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import { Friend } from "@/types/social";
import { useQuery } from "@tanstack/react-query";

// 친구 아이디 목록 조회
const useSocialFriendIdsQuery = () => {
  const query = useQuery<Friend[]>({
    queryKey: QueryKey.useSocialFriendsQuery(),
    queryFn: getSocialFriends,
  });

  return { ...query, data: query.data?.map(({ friendId }) => friendId) };
};

export default useSocialFriendIdsQuery;
