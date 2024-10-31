import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../apis";
import { CategoriesQueryParams } from "../../types";

export const useFetchCategoriesQuery = ({
  page,
  items,
}: CategoriesQueryParams) => {
  return useQuery({
    queryKey: ["categories", page, items],
    queryFn: () => getAllCategories({ page, items }),
    placeholderData: (previousData) =>
      previousData || { data: [], total: 0, page, items },
  });
};
