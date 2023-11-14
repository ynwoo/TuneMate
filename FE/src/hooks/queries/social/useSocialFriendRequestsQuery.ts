import { getSocialFriendRequests } from "@/api/social";
import { QueryKey } from "@/constants/queryKey";
import { FriendRequest } from "@/types/social";
import { useQuery } from "@tanstack/react-query";
import useSocialFriendIdsQuery from "./useSocialFriendIdsQuery";
import { useMemo } from "react";

// 친구 요청 목록 조회
const useSocialFriendRequestsQuery = () => {
  const { data: friendIds } = useSocialFriendIdsQuery();
  const query = useQuery<FriendRequest[]>({
    queryKey: QueryKey.useSocialFriendRequestsQuery(),
    queryFn: getSocialFriendRequests,
  });

  const data = useMemo(() => {
    if (!friendIds) return;
    return query.data?.filter(({ userId }) => !friendIds.includes(userId));
  }, [friendIds, query.data]);

  return { ...query, data };
};

export default useSocialFriendRequestsQuery;
