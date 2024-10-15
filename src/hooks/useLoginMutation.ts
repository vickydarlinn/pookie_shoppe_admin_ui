import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../apis";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["self"] });
      return;
    },
  });
};
