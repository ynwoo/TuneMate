import { leaveMyGroup } from '@/api/group';
import { useMutation } from '@tanstack/react-query';

// 참여중인 공고 탈퇴
const useLeaveMyGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: leaveMyGroup,
  });

  return mutation;
};

export default useLeaveMyGroupMutation;
