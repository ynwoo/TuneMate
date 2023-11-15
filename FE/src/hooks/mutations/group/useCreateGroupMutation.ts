import { createGroup } from "@/api/group";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

// 모집 공고 생성
const useCreateGroupMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess(data, variables, context) {
      router.push("/groups");
    },
  });

  return mutation;
};

export default useCreateGroupMutation;
