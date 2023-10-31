import { createCommonPlayList } from '@/api/music/common';
import { useMutation } from '@tanstack/react-query';

// 공동 플레이리스트 생성
const useCreateCommonPlayListMutation = () => {
  const mutation = useMutation({ mutationFn: createCommonPlayList });

  return mutation;
};

export default useCreateCommonPlayListMutation;
