import { useMutation } from "@tanstack/react-query";
import { logout } from "../apis";
import { useAuthStore } from "../store";

export const useLogoutMutation = () => {
  const { logout: logoutFromStore } = useAuthStore();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
    },
  });
};
