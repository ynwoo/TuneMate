import { participateGroup } from "@/api/group";
import { QueryKey } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 참여 요청
const useParticipateGroupMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: participateGroup,
    onSuccess(data, variables, context) {
      // TODO: 신청 목록 전체 초기화 말고, 단일 초기화로 리팩토링 필요
      queryClient.invalidateQueries(QueryKey.useGroupSentParticipationsQuery());
    },
  });

  return mutation;
};

export default useParticipateGroupMutation;
