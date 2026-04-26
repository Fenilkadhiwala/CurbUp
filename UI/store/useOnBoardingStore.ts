import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnBoardingState {
  onboardingComplete: boolean;
  setOnboardingComplete: () => void;
}

const useOnboardingStore = create<OnBoardingState>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      setOnboardingComplete: () => set({ onboardingComplete: true }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useOnboardingStore;
