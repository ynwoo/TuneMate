import { deleteIndividualPlayListTrack } from "@/api/music/individual";
import { QueryKey } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 개인 대표 플레이리스트 트랙 삭제
const useDeleteIndividualPlayListTrackMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteIndividualPlayListTrack,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(QueryKey.useIndividualPlayListRepresentativeQuery());
    },
  });

  return mutation;
};

export default useDeleteIndividualPlayListTrackMutation;
