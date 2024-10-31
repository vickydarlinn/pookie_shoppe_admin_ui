import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../apis";

export const useDeleteCategoryMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "categories"],
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
