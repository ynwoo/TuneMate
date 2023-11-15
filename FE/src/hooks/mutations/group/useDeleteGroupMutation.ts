import { deleteGroup } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { initGroupSearchOptions } from "@/pages/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

// 모집 공고 삭제
const useDeleteGroupMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess(data, variables, context) {
      router.push("/groups");

      // 모집 공고
      queryClient.invalidateQueries(
        QueryKey.useGroupsQuery(initGroupSearchOptions)
      );
    },
  });

  return mutation;
};

export default useDeleteGroupMutation;
