import { login } from "@/api/user";
import { TokenResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// 로그인
const useLoginQuery = () => {
  const query = useQuery<TokenResponse>({
    queryKey: ["useLoginQuery"],
    queryFn: login,
  });

  return query;
};

export default useLoginQuery;
