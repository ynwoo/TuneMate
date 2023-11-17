import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIndividualPlayListTrack } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";

// 개인 대표 플레이리스트 트랙 추가
const useCreateIndividualPlayListTrackMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createIndividualPlayListTrack,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useIndividualPlayListRepresentativeQuery());
    },
  });

  return mutation;
};

export default useCreateIndividualPlayListTrackMutation;
