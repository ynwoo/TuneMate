import { participateGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 참여 요청
const useParticipateGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: participateGroup,
  });

  return mutation;
};

export default useParticipateGroupMutation;
