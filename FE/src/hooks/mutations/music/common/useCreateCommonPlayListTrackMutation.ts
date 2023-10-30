import { createCommonPlayListTrack } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

const useCreateCommonPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: createCommonPlayListTrack });

  return mutation;
};

export default useCreateCommonPlayListTrackMutation;
