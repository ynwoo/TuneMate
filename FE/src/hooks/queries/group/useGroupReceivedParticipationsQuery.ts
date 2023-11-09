import { getGroupReceivedParticipations } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { ParticipationRequest } from "@/types/group";
import { useQuery } from "@tanstack/react-query";

// 받은 참여 요청 조회
const useGroupReceivedParticipationsQuery = () => {
  const query = useQuery<ParticipationRequest[]>({
    queryKey: QueryKey.useGroupReceivedParticipationsQuery(),
    queryFn: getGroupReceivedParticipations,
  });

  return query;
};

export default useGroupReceivedParticipationsQuery;
