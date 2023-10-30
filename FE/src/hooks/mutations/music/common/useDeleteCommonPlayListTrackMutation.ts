import { deleteCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

const useDeleteCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: deleteCommonPlayListTrack });

  return mutation;
};

export default useDeleteCommonPlayListTrackMutation;
