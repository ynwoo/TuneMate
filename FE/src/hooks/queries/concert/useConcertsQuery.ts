import { getConcerts } from "@/api/concert";
import { QueryKey } from "@/constants/queryKey";
import { Concert, ConcertSearchOption } from "@/types/concert";
import { useQuery } from "@tanstack/react-query";

// 공연 정보 목록 조회
const useConcertsQuery = (concertSearchOption: ConcertSearchOption) => {
  const query = useQuery<Concert[]>({
    queryKey: QueryKey.useConcertsQuery(concertSearchOption),
    queryFn: () => getConcerts(concertSearchOption),
  });

  return query;
};

export default useConcertsQuery;
