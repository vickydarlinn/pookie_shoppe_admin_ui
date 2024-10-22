import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../apis";
import { UpdateUser } from "../types";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update", "users"],
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUser }) =>
      updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
