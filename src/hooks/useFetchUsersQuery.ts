import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis";
import { UserQueryParams } from "../types";

export const useFetchUsersQuery = ({
  page,
  items,
  q,
  role,
}: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", page, items, q, role],
    queryFn: () => getAllUsers({ page, items, q, role }),
    placeholderData: (previousData) =>
      previousData || { data: [], total: 0, page, items },
  });
};
