import { addIndividualMusicCount } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

// 노래 재생 카운트
const useAddIndividualMusicCountMutation = () => {
  const mutation = useMutation({ mutationFn: addIndividualMusicCount });

  return mutation;
};

export default useAddIndividualMusicCountMutation;
