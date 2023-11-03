import { deleteMeeting } from '@/api/meeting';
import { useMutation } from '@tanstack/react-query';

// 만남 삭제
const useDeleteMeetingMutation = () => {
  const mutation = useMutation({
    mutationFn: deleteMeeting,
  });

  return useDeleteMeetingMutation;
};

export default useDeleteMeetingMutation;
