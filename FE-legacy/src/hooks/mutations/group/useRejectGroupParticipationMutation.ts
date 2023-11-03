import { rejectGroupParticipation } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 참여 요청 거절
const useRejectGroupParticipationMutation = () => {
  const mutation = useMutation({
    mutationFn: rejectGroupParticipation,
  });

  return mutation;
};

export default useRejectGroupParticipationMutation;
