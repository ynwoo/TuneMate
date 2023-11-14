import { deleteGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 모집 공고 삭제
const useDeleteGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: deleteGroup,
  });

  return mutation;
};

export default useDeleteGroupMutation;
