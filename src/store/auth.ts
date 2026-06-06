import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  userId: string;
  email: string;
  role: "PATIENT" | "ADMIN" | "DOCTOR";
  fullName: string;
}

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        set({ user: null });
      },
    }),
    {
      name: "medibridge-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
