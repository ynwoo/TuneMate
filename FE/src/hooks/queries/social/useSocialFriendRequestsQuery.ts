import { getSocialFriendRequests } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import { FriendRequest } from "@/types/social";
import { useQuery } from "@tanstack/react-query";

// 친구 요청 목록 조회
const useSocialFriendRequestsQuery = () => {
  const query = useQuery<FriendRequest[]>({
    queryKey: QueryKey.useSocialFriendRequestsQuery(),
    queryFn: getSocialFriendRequests,
  });

  return query;
};

export default useSocialFriendRequestsQuery;
