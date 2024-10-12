import { create } from "zustand";
import { AuthState, User } from "../types";
import { devtools } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    logout: () => set({ user: null }),
  }))
);

export default useAuthStore;
