import { declineSocialFriendRequest } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

// 친구 요청 거절
const useDeclineSocialFriendRequestMutation = () => {
  const mutation = useMutation({ mutationFn: declineSocialFriendRequest });

  return mutation;
};

export default useDeclineSocialFriendRequestMutation;
