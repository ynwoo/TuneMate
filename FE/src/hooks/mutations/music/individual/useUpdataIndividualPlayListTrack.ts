import { updateIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useUpdateIndividualPlayListTrack = () => {
  const mutation = useMutation({ mutationFn: updateIndividualPlayListTrack });

  return mutation;
};

export default useUpdateIndividualPlayListTrack;
