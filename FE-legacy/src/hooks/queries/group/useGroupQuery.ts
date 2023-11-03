import { getGroup } from '@/api/group';
import { Group } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

// 모집 공고 조회
const useGroupQuery = (groupId: Group['groupId']) => {
  const query = useQuery<Group>({
    queryKey: ['useGroupQuery', groupId],
    queryFn: () => getGroup(groupId),
  });

  return query;
};

export default useGroupQuery;
