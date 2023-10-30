import { updateCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

const useUpdateCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: updateCommonPlayListTrack });

  return mutation;
};

export default useUpdateCommonPlayListTrackMutation;
