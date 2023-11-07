import { disconnectChatRoom } from "@/api/social";
import { useMutation } from "@tanstack/react-query";

// 내가 참여한 채팅방 목록 조회
const useDisconnectChatRoomMutation = () => {
  const mutation = useMutation({
    mutationFn: disconnectChatRoom,
  });

  return mutation;
};

export default useDisconnectChatRoomMutation;
