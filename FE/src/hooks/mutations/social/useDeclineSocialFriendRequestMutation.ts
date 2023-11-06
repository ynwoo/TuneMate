import { declineSocialFriendRequest } from "@/api/social";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 친구 요청 거절
const useDeclineSocialFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: declineSocialFriendRequest,
    onSuccess() {
      queryClient.invalidateQueries(["useSocialFriendRequestsQuery"]);
    },
  });

  return mutation;
};

export default useDeclineSocialFriendRequestMutation;
