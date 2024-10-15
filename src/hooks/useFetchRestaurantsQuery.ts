import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "../apis";

export const useFetchRestaurantsQuery = () =>
  useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
  });
