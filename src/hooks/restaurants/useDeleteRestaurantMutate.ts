import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestaurant } from "../../apis";

export const useDeleteRestaurantMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "restaurants"],
    mutationFn: deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
