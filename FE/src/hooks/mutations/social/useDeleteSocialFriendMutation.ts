import { deleteSocialFriend } from '@/api/social';
import { useMutation } from '@tanstack/react-query';

// 친구 삭제
const useDeleteSocialFriendMutation = () => {
  const mutation = useMutation({ mutationFn: deleteSocialFriend });

  return mutation;
};

export default useDeleteSocialFriendMutation;
