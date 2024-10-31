import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCategory } from "../../apis";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "categories"],
    mutationFn: createNewCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
