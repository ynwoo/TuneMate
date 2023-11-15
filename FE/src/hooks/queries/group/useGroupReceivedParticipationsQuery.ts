import { getGroupReceivedParticipations } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { GroupParticipation } from "@/types/group";
import { useQuery } from "@tanstack/react-query";

// 받은 참여 요청 조회
const useGroupReceivedParticipationsQuery = () => {
  const query = useQuery<GroupParticipation[]>({
    queryKey: QueryKey.useGroupReceivedParticipationsQuery(),
    queryFn: getGroupReceivedParticipations,
  });

  return query;
};

export default useGroupReceivedParticipationsQuery;
