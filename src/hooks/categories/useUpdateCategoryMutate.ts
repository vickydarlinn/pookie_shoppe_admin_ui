import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../apis";
import { CreateCategory } from "../../types";

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update", "categories"],
    mutationFn: ({
      id,
      categoryData,
    }: {
      id: string;
      categoryData: CreateCategory;
    }) => updateCategory(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
