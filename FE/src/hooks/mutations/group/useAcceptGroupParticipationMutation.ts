import { acceptGroupParticipation } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 참여 요청 수락
const useAcceptGroupParticipationMutation = () => {
  const mutation = useMutation({
    mutationFn: acceptGroupParticipation,
  });

  return mutation;
};

export default useAcceptGroupParticipationMutation;
