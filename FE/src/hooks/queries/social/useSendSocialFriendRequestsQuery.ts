import { getSendSocialFriendRequests } from "@/api/social";
import { useQuery } from "@tanstack/react-query";

// 내가 친구요청 보낸 사람들의 아이디 조회
const useSendSocialFriendRequestsQuery = () => {
  const query = useQuery({
    queryKey: ["useSendSocialFriendRequestsQuery"],
    queryFn: getSendSocialFriendRequests,
  });

  return query;
};

export default useSendSocialFriendRequestsQuery;
