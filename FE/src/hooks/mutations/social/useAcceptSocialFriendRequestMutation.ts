import { acceptSocialFriendRequest } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

// 친구 요청 수락
const useAcceptSocialFriendRequestMutation = () => {
  const mutation = useMutation({ mutationFn: acceptSocialFriendRequest });

  return mutation;
};

export default useAcceptSocialFriendRequestMutation;
