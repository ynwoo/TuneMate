import { reissueToken } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

// tunemate refresh token으로 access token 갱신
const useReissueTokenQuery = () => {
  const query = useQuery({
    queryKey: ["useReissueTokenQuery"],
    queryFn: reissueToken,
  });

  return query;
};

export default useReissueTokenQuery;
