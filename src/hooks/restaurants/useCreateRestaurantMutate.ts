import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewRestaurant } from "../../apis";

export const useCreateRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "restaurants"],
    mutationFn: createNewRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
