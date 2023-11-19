import { useMemo } from "react";
import useGroupReceivedParticipationsQuery from "./queries/group/useGroupReceivedParticipationsQuery";

const useGroupRequest = () => {
  const { data: groupReceivedParticipations } =
    useGroupReceivedParticipationsQuery();

  const unreadGroupRequestCount = useMemo(() => {
    if (!groupReceivedParticipations) return 0;
    return groupReceivedParticipations.length;
  }, [groupReceivedParticipations]);

  return { unreadGroupRequestCount };
};

export default useGroupRequest;
