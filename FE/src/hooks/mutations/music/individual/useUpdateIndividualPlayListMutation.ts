import { updateIndividualPlayList } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 대표 플레이리스트 설정
const useUpdateIndividualPlayListMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateIndividualPlayList,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useIndividualPlayListRepresentativeQuery());
    },
  });

  return mutation;
};

export default useUpdateIndividualPlayListMutation;
