import { getConcerts } from '@/api/concert';
import { Concert, ConcertSearchOption } from '@/types/concert';
import { useQuery } from '@tanstack/react-query';

const useConcertsQuery = (concertSearchOption: ConcertSearchOption) => {
  const query = useQuery<Concert[]>({
    queryKey: ['useConcertsQuery', concertSearchOption],
    queryFn: () => getConcerts(concertSearchOption),
  });

  return query;
};

export default useConcertsQuery;
