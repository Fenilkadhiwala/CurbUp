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

const Stack: RootStackParamList | any = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, loading } = useAuth();
  const { onboardingComplete } = useOnboardingStore();

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
        {!onboardingComplete ? (
          <>
            <Stack.Screen
              name="NotificationPermission"
              component={NotificationPermissionScreen}
            />
            <Stack.Screen
              name="LocationPermission"
              component={LocationPermissionScreen}
            />
          </>
        ) : !token ? (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
