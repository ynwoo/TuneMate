import { getMyGroups } from '@/api/group';
import { Group } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

// 참여중인 공고 조회
const useMyGroupsQuery = () => {
  const query = useQuery<Group[]>({
    queryKey: ['useMyGroupsQuery'],
    queryFn: getMyGroups,
  });

  return query;
};

export default useMyGroupsQuery;
