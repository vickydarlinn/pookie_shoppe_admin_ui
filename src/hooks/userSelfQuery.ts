import { useQuery } from "@tanstack/react-query";
import { self } from "../apis";
import { AxiosError } from "axios";

export const useSelfQuery = () => {
  return useQuery({
    queryKey: ["self"],
    queryFn: self,
    retry(failureCount, error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
