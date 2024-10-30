import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../apis";

export const useDeleteUserMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "users"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
