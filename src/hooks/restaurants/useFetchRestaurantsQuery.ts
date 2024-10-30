import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "../../apis";
import { RestaurantQueryParams } from "../../types";

export const useFetchRestaurantsQuery = ({
  page,
  items,
  q,
}: RestaurantQueryParams) =>
  useQuery({
    queryKey: ["restaurants", page, items, q],
    queryFn: () => getAllRestaurants({ page, items, q }),
    placeholderData: (previousData) =>
      previousData || { data: [], total: 0, page, items },
  });
