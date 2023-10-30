import { addIndividualMusicCount } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useAddIndividualMusicCountMutation = () => {
  const mutation = useMutation({ mutationFn: addIndividualMusicCount });

  return mutation;
};

export default useAddIndividualMusicCountMutation;
