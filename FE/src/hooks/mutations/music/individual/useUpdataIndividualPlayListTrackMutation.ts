import { updateIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

// 개인 플레이리스트 트랙 순서 변경
const useUpdateIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: updateIndividualPlayListTrack });

  return mutation;
};

export default useUpdateIndividualPlayListTrackMutation;
