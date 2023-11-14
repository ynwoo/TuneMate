import { getUserInfo } from '@/api/user';
import { UserInfo } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

// 유저 정보 조회
const useUserInfoQuery = (userId: UserInfo['userId']) => {
  const query = useQuery<UserInfo>({
    queryKey: ['useUserInfoQuery', userId],
    queryFn: () => getUserInfo(userId),
  });

  return query;
};

export default useUserInfoQuery;
