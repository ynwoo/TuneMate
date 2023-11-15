import useGroupSentParticipationsQuery from "./useGroupSentParticipationsQuery";
import { useMemo } from "react";

// 내가 신청한 그룹 id 리스트
const useSentParticipationGroupIdsQuery = () => {
  const query = useGroupSentParticipationsQuery();

  const data: string[] | undefined = useMemo(() => {
    if (!query?.data) return undefined;

    return query.data.map(({ responseGroup: { groupId } }) => groupId);
  }, [query.data]);

  return { ...query, data };
};

export default useSentParticipationGroupIdsQuery;
