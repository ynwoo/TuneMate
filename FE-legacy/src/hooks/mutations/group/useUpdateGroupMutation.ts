import { updateGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 모집 공고 수정
const useUpdateGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: updateGroup,
  });

  return mutation;
};

export default useUpdateGroupMutation;
