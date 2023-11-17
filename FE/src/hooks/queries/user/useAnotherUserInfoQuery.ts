import { getOthersProfile } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { UserInfo } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// 다른 사람의 유저 정보 불러오기
const useAnotherUserInfoQuery = (userId: UserInfo["userId"]) => {
  const query = useQuery({
    queryKey: QueryKey.useAnotherUserInfoQuery(userId),
    queryFn: () => getOthersProfile(userId),
  });

  return query;
};

export default useAnotherUserInfoQuery;
