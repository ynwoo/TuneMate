import { createCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

// 공동 플레이리스트 트랙 추가
const useCreateCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: createCommonPlayListTrack });

  return mutation;
};

export default useCreateCommonPlayListTrackMutation;
