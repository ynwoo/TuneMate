import { getSocialFriends } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import { Friend } from "@/types/social";
import { useQuery } from "@tanstack/react-query";

// 친구 목록 조회
const useSocialFriendsQuery = () => {
  const query = useQuery<Friend[]>({
    queryKey: QueryKey.useSocialFriendsQuery(),
    queryFn: getSocialFriends,
  });

  return query;
};

export default useSocialFriendsQuery;
