import { createMeeting } from '@/api/meeting';
import { useMutation } from '@tanstack/react-query';

// 만남 생성 기능
const useCreateMeetingMutation = () => {
  const mutation = useMutation({
    mutationFn: createMeeting,
  });

  return mutation;
};

export default useCreateMeetingMutation;
