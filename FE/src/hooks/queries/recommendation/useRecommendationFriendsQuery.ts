import { useQuery } from "@tanstack/react-query";
import { getRecommendationFriends } from "@/api/recommendation";
import { RecommendationFriend } from "@/types/social";
import { QueryKey } from "@/constants/queryKey";
import useSendSocialFriendRequestsQuery from "../social/useSendSocialFriendRequestsQuery";
import { useMemo } from "react";
import useSocialFriendIdsQuery from "../social/useSocialFriendIdsQuery";

// 추천 친구 목록 조회
const useRecommendationFriendsQuery = () => {
  const { data: socialFriendIds } = useSocialFriendIdsQuery();
  const { data: sendSocialFriends } = useSendSocialFriendRequestsQuery();
  const query = useQuery<RecommendationFriend[]>({
    queryKey: QueryKey.useRecommendationFriendsQuery(),
    queryFn: getRecommendationFriends,
  });

  const data = useMemo(() => {
    if (socialFriendIds && sendSocialFriends && query.data) {
      const friendIds = [...sendSocialFriends, ...socialFriendIds];

      return query.data.filter(
        ({ userId }) => userId !== "dummy" && !friendIds.includes(userId)
      );
    }

    return undefined;
  }, [query.data, sendSocialFriends, socialFriendIds]);

  return { ...query, data };
};

export default useRecommendationFriendsQuery;
