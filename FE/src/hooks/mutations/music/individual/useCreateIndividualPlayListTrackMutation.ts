import { createIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useCreateIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({
    mutationFn: createIndividualPlayListTrack,
  });

  return mutation;
};

export default useCreateIndividualPlayListTrackMutation;
