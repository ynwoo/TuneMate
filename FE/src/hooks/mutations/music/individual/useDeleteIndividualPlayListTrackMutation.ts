import { deleteIndividualPlayListTrack } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useDeleteIndividualPlayListTrackMutation = () => {
  const mutation = useMutation({
    mutationFn: deleteIndividualPlayListTrack,
  });

  return mutation;
};

export default useDeleteIndividualPlayListTrackMutation;
