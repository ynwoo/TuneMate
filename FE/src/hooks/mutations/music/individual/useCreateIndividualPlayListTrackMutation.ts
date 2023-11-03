import { useMutation } from '@tanstack/react-query';
import { createIndividualPlayListTrack } from '@/api/music/individual';

// 개인 대표 플레이리스트 트랙 추가
const useCreateIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({
    mutationFn: createIndividualPlayListTrack,
  });

  return mutation;
};

export default useCreateIndividualPlayListTrackMutation;
