import { updateIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useUpdateIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({ mutationFn: updateIndividualPlayListTrack });

  return mutation;
};

export default useUpdateIndividualPlayListTrackMutation;
