import { deadlineGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 모집 공고 마감
const useDeadlineGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: deadlineGroup,
  });

  return mutation;
};

export default useDeadlineGroupMutation;
