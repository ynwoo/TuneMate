import { createGroup } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { initGroupSearchOptions } from "@/pages/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

// 모집 공고 생성
const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess(data, variables, context) {
      router.push("/groups");

      // 공고 조회 cache 무효화
      queryClient.invalidateQueries(
        QueryKey.useGroupsQuery(initGroupSearchOptions)
      );
    },
  });

  return mutation;
};

export default useCreateGroupMutation;
