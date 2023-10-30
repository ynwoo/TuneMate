import { declineSocialFriendRequest } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

const useDeclineSocialFriendRequestMutation = () => {
  const mutation = useMutation({ mutationFn: declineSocialFriendRequest });

  return mutation;
};

export default useDeclineSocialFriendRequestMutation;
