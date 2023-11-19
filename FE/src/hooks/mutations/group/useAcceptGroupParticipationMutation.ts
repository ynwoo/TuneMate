import { acceptGroupParticipation } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 참여 요청 수락
const useAcceptGroupParticipationMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: acceptGroupParticipation,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useGroupReceivedParticipationsQuery());
    },
  });

  return mutation;
};

export default useAcceptGroupParticipationMutation;
