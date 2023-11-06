import { updateIndividualPlayList } from '@/api/music/individual';
import { useMutation } from '@tanstack/react-query';

// 대표 플레이리스트 설정
const useUpdateIndividualPlayListMutation = () => {
  const mutation = useMutation({
    mutationFn: updateIndividualPlayList,
  });

  return mutation;
};

export default useUpdateIndividualPlayListMutation;
