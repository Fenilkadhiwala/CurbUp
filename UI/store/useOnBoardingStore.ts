import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnBoardingState {
  isNotificationAllowed: boolean;
  isNotificationPermissionSeen: boolean;
  isLocationSharingAllowed: boolean;
  isLocationPermissionSeen: boolean;
  lastUserId: string | null;
  setNotificationAllowed: (flag: boolean, userId: string) => void;
  setLocationAllowed: (flag: boolean, userId: string) => void;
  checkAndResetForUser: (userId: string) => void;
  resetOnboarding: () => void;
}

const useOnboardingStore = create<OnBoardingState>()(
  persist(
    (set, get) => ({
      isNotificationAllowed: false,
      isNotificationPermissionSeen: false,
      isLocationSharingAllowed: false,
      isLocationPermissionSeen: false,
      lastUserId: null,
      setNotificationAllowed: (flag: boolean, userId: string) =>
        set({
          isNotificationAllowed: flag,
          isNotificationPermissionSeen: true,
          lastUserId: userId,
        }),
      setLocationAllowed: (flag: boolean, userId: string) =>
        set({
          isLocationSharingAllowed: flag,
          isLocationPermissionSeen: true,
          lastUserId: userId,
        }),
      checkAndResetForUser: (userId: string | undefined) => {
        if (!userId) return;

        const { lastUserId, isNotificationAllowed, isLocationSharingAllowed } =
          get();

        if (lastUserId !== userId) {
          set({
            isNotificationAllowed: false,
            isNotificationPermissionSeen: false,
            isLocationSharingAllowed: false,
            isLocationPermissionSeen: false,
            lastUserId: userId,
          });
        } else {
          set({
            isNotificationPermissionSeen: isNotificationAllowed,
            isLocationPermissionSeen: isLocationSharingAllowed,
            lastUserId: userId,
          });
        }
      },
      resetOnboarding: () =>
        set({
          isNotificationAllowed: false,
          isNotificationPermissionSeen: false,
          isLocationSharingAllowed: false,
          isLocationPermissionSeen: false,
          lastUserId: null,
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useOnboardingStore;
