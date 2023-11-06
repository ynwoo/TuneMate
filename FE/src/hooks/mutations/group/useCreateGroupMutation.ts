import { createGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 모집 공고 생성
const useCreateGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: createGroup,
  });

  return mutation;
};

export default useCreateGroupMutation;
