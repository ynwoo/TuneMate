import { sendSocialFriendRequest } from "@/api/social";
import useFriendRequest from "@/hooks/useFriendRequest";
import { useMutation } from "@tanstack/react-query";

// 친구 신청
const useSendSocialFriendRequestMutation = () => {
  const { subscribe } = useFriendRequest();
  const mutation = useMutation({
    mutationFn: sendSocialFriendRequest,
    onSuccess(data, variables, context) {
      // 친구 신청 성공하면 구독 신청
      subscribe(variables.userId);
    },
  });

  return mutation;
};

export default useSendSocialFriendRequestMutation;
