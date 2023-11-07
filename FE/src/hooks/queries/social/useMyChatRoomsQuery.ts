import { getMyChatRooms } from "@/api/social";
import { useQuery } from "@tanstack/react-query";

// 내가 참여한 채팅방 목록 조회
const useMyChatRoomsQuery = () => {
  const query = useQuery({
    queryKey: ["usemyChatRooms"],
    queryFn: getMyChatRooms,
  });

  return query;
};

export default useMyChatRoomsQuery;
