import { acceptSocialFriendRequest } from "@/api/social";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 친구 요청 수락
const useAcceptSocialFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: acceptSocialFriendRequest,
    onSuccess() {
      queryClient.invalidateQueries(["useSocialFriendRequestsQuery"]);
    },
  });

  return mutation;
};

export default useAcceptSocialFriendRequestMutation;
