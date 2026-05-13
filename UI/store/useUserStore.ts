import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  auth0_id: string;
  email: string;
  full_name: string;
  phone_number: number | string | null;
}

interface UserState {
  user: User;

  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

const initialUser: User = {
  auth0_id: "",
  email: "",
  full_name: "",
  phone_number: "",
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: initialUser,

      setUser: (userData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...userData,
          },
        })),

      clearUser: () =>
        set({
          user: initialUser,
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
