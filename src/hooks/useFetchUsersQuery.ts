import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis";

export const useFetchUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
