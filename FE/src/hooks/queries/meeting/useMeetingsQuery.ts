import { getMeetings } from "@/api/meeting";
import { QueryKey } from "@/constants/queryKey";
import { Meeting } from "@/types/meeting";
import { useQuery } from "@tanstack/react-query";

// 만남 목록 조회
const useMeetingsQuery = (relationId: Meeting["relationId"]) => {
  const query = useQuery<Meeting[]>({
    queryKey: QueryKey.useMeetingsQuery(relationId),
    queryFn: () => getMeetings(relationId),
  });

  return query;
};

export default useMeetingsQuery;
