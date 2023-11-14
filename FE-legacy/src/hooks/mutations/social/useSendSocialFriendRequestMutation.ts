import { sendSocialFriendRequest } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

// 친구 신청
const useSendSocialFriendRequestMutation = () => {
  const mutation = useMutation({
    mutationFn: sendSocialFriendRequest,
  });

  return mutation;
};

export default useSendSocialFriendRequestMutation;
