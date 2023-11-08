import { login } from "@/api/user";
import { QueryKey } from "@/constants/queryKey";
import { TokenResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// 로그인
const useLoginQuery = () => {
  const query = useQuery<TokenResponse>({
    queryKey: QueryKey.useLoginQuery(),
    queryFn: login,
  });

  return query;
};

export default useLoginQuery;
