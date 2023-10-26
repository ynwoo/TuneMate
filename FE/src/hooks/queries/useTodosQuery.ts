import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/api/todos';

const useTodosQuery = () => {
  return useQuery({
    queryKey: ['useTodosQuery'],
    queryFn: getTodos,
  });
};

export default useTodosQuery;
