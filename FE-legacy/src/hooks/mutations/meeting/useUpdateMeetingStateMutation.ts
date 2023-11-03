import { updateMeetingState } from '@/api/meeting';
import { useMutation } from '@tanstack/react-query';

// 만남 상태 변경
const useUpdateMeetingStateMutation = () => {
  const mutation = useMutation({
    mutationFn: updateMeetingState,
  });

  return mutation;
};

export default useUpdateMeetingStateMutation;
