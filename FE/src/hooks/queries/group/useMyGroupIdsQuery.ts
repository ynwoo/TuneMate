import useMyGroupsQuery from "./useMyGroupsQuery";
import { useMemo } from "react";

// 참여중인 공고 id 리스트
const useMyGroupIdsQuery = () => {
  const query = useMyGroupsQuery();

  const data: string[] | undefined = useMemo(() => {
    if (!query.data) return undefined;

    return query.data.map(({ responseGroup: { groupId } }) => groupId);
  }, [query.data]);

  return { ...query, data };
};

export default useMyGroupIdsQuery;
