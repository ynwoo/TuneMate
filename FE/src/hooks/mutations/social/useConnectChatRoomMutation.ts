import { connectChatRoom } from "@/api/social";
import { useMutation } from "@tanstack/react-query";

// 채팅 방 접속
const useConnectChatRoomMutation = () => {
  const mutation = useMutation({
    mutationFn: connectChatRoom,
  });

  return mutation;
};

export default useConnectChatRoomMutation;
