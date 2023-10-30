import { createCommonPlayList } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

const useCreateCommonPlayListMutation = () => {
  const mutation = useMutation({ mutationFn: createCommonPlayList });

  return mutation;
};

export default useCreateCommonPlayListMutation;
