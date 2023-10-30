import { acceptSocialFriendRequest } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

const useAcceptSocialFriendRequestMutation = () => {
  const mutation = useMutation({ mutationFn: acceptSocialFriendRequest });

  return mutation;
};

export default useAcceptSocialFriendRequestMutation;
