import { getMyGroups } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { Group } from "@/types/group";
import { useQuery } from "@tanstack/react-query";

// 참여중인 공고 조회
const useMyGroupsQuery = () => {
  const query = useQuery<Group[]>({
    queryKey: QueryKey.useMyGroupsQuery(),
    queryFn: getMyGroups,
  });

  return query;
};

export default useMyGroupsQuery;
