import { createIndividualPlayList } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

const useCreateIndividualPlayListMutation = () => {
  const mutation = useMutation({
    mutationFn: createIndividualPlayList,
  });

  return mutation;
};

export default useCreateIndividualPlayListMutation;
