import { rejectGroupParticipation } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 참여 요청 거절
const useRejectGroupParticipationMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: rejectGroupParticipation,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useGroupReceivedParticipationsQuery());
    },
  });

  return mutation;
};

export default useRejectGroupParticipationMutation;
