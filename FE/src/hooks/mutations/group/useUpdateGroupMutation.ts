import { updateGroup } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { initGroupSearchOptions } from "@/pages/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 모집 공고 수정
const useUpdateGroupMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateGroup,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useGroupQuery(variables.groupId));
      queryClient.invalidateQueries(QueryKey.useGroupsQuery(initGroupSearchOptions));
    },
  });

  return mutation;
};

export default useUpdateGroupMutation;
