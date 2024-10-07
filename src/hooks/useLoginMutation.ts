import { useMutation } from "@tanstack/react-query";
import { login } from "../apis";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
    },
  });
