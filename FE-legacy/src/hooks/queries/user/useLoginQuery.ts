import { login } from '@/api/user';
import { TokenResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

// 로그인
const useLoginQuery = (code: string) => {
  const query = useQuery<TokenResponse>({
    queryKey: ['useLoginQuery', code],
    queryFn: () => login(code),
  });

  return query;
};

export default useLoginQuery;
