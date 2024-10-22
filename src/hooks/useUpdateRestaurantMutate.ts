import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRestaurant } from "../apis";
import { CreateRestaurant } from "../types";

export const useUpdateRestaurantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update", "restaurants"],
    mutationFn: ({
      id,
      restaurantData,
    }: {
      id: string;
      restaurantData: CreateRestaurant;
    }) => updateRestaurant(id, restaurantData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
