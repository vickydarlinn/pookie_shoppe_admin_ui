import { useQuery } from "@tanstack/react-query";
import { self } from "../apis";

export const useSelfQuery = () =>
  useQuery({
    queryKey: ["self"],
    queryFn: self,
    enabled: false,
  });
