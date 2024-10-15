import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewUser } from "../apis";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "users"],
    mutationFn: createNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
