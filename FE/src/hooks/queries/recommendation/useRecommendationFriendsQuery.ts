import { useQuery } from "@tanstack/react-query";
import { getRecommendationFriends } from "@/api/recommendation";
import { RecommendationFriend } from "@/types/social";
import { QueryKey } from "@/constants/queryKey";
import useSocialFriendsQuery from "../social/useSocialFriendsQuery";
import useSendSocialFriendRequestsQuery from "../social/useSendSocialFriendRequestsQuery";
import { useMemo } from "react";

// 추천 친구 목록 조회
const useRecommendationFriendsQuery = () => {
  const { data: socialFriends } = useSocialFriendsQuery();
  const { data: sendSocialFriends } = useSendSocialFriendRequestsQuery();
  const query = useQuery<RecommendationFriend[]>({
    queryKey: QueryKey.useRecommendationFriendsQuery(),
    queryFn: getRecommendationFriends,
  });

  const data = useMemo(() => {
    if (socialFriends && sendSocialFriends && query.data) {
      const friendIds = [
        ...sendSocialFriends,
        ...socialFriends.map(({ friendId }) => friendId),
      ];

      return query.data.filter(
        ({ userId }) => userId !== "dummy" && !friendIds.includes(userId)
      );
    }

    return undefined;
  }, [query.data, sendSocialFriends, socialFriends]);

  return { ...query, data };
};

export default useRecommendationFriendsQuery;
