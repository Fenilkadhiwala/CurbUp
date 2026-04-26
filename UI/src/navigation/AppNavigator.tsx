import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import useOnboardingStore from "@/store/useOnBoardingStore";
import SigninScreen from "../screens/Auth/SigninScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import { ForgotPasswordScreen } from "../screens/Auth/ForgotPasswordScreen";
import NotificationPermissionScreen from "../screens/Permissions/NotificationPermissionScreen";
import LocationPermissionScreen from "../screens/Permissions/LocationPermissionScreen";
import { useEffect } from "react";

const Stack: RootStackParamList | any = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useAuth();
  const { isNotificationPermissionSeen, isLocationPermissionSeen } =
    useOnboardingStore();
  const { user } = useAuth();
  const { checkAndResetForUser } = useOnboardingStore();

  useEffect(() => {
    checkAndResetForUser(user?.auth0_id);
  }, [token, user?.auth0_id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#246BFD" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "#ffffff" } }}
      >
        {!token ? (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : !isNotificationPermissionSeen ? (
          <Stack.Screen
            name="NotificationPermission"
            component={NotificationPermissionScreen}
          />
        ) : !isLocationPermissionSeen ? (
          <Stack.Screen
            name="LocationPermission"
            component={LocationPermissionScreen}
          />
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
