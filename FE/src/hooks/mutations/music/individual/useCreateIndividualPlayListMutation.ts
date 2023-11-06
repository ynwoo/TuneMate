import { useMutation } from '@tanstack/react-query';
import { createIndividualPlayList } from '@/api/music/individual';

// 개인 플레이리스트 생성
const useCreateIndividualPlayListMutation = () => {
  const mutation = useMutation({
    mutationFn: createIndividualPlayList,
  });

  return mutation;
};

export default useCreateIndividualPlayListMutation;
