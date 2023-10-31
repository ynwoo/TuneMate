import { updateCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

// 공동 플레이리스트 트랙 순서 변경
const useUpdateCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: updateCommonPlayListTrack });

  return mutation;
};

export default useUpdateCommonPlayListTrackMutation;
