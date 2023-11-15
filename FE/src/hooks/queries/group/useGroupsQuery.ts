import { getGroups } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { Group, GroupSearchOptions } from "@/types/group";
import { useQuery } from "@tanstack/react-query";

// 모집 공고 목록 조회
const useGroupsQuery = (groupSearchOptions: GroupSearchOptions) => {
  const query = useQuery<Group[]>({
    queryKey: QueryKey.useGroupsQuery(groupSearchOptions),
    queryFn: () => getGroups(groupSearchOptions),
  });

  return query;
};

export default useGroupsQuery;
