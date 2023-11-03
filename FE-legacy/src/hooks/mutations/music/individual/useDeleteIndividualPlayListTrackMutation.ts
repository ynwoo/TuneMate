import { deleteIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

// 개인 대표 플레이리스트 트랙 삭제
const useDeleteIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({
    mutationFn: deleteIndividualPlayListTrack,
  });

  return mutation;
};

export default useDeleteIndividualPlayListTrackMutation;
