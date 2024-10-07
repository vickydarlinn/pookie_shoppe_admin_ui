import { create } from "zustand";
import { AuthState, User } from "../types";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
