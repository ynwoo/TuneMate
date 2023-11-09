import { getGroups } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { Group } from "@/types/group";
import { useQuery } from "@tanstack/react-query";

// 모집 공고 목록 조회
const useGroupsQuery = () => {
  const query = useQuery<Group[]>({
    queryKey: QueryKey.useGroupsQuery(),
    queryFn: getGroups,
  });

  return query;
};

export default useGroupsQuery;
