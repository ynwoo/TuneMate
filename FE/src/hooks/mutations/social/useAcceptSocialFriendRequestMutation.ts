import { acceptSocialFriendRequest } from "@/api/social";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCreateCommonPlayListMutation from "../music/common/useCreateCommonPlayListMutation";
import { NewCommonPlayList } from "@/types/playList";

// 친구 요청 수락
const useAcceptSocialFriendRequestMutation = () => {
  const { mutate: createCommonPlayList } = useCreateCommonPlayListMutation();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: acceptSocialFriendRequest,
    onSuccess(data, variables, context) {
      // 친구 요청 목록 refetch
      queryClient.invalidateQueries(["useSocialFriendRequestsQuery"]);

      // 공동 플레이리스트 생성
      const newCommonPlayList: NewCommonPlayList = {
        relationId: data.relationId,
        name: "공동 플레이 리스트",
        description: "",
        open: false,
      };
      createCommonPlayList(newCommonPlayList);
    },
  });

  return mutation;
};

export default useAcceptSocialFriendRequestMutation;
