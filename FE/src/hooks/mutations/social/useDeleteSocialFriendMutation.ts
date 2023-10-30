import { deleteSocialFriend } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

const useDeleteSocialFriendMutation = () => {
  const mutation = useMutation({ mutationFn: deleteSocialFriend });

  return mutation;
};

export default useDeleteSocialFriendMutation;
