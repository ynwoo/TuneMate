import { deleteCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

// 공동 플레이리스트 트랙 삭제
const useDeleteCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: deleteCommonPlayListTrack });

  return mutation;
};

export default useDeleteCommonPlayListTrackMutation;
