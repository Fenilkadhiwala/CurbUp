import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useOnboardingStore from "@/store/useOnBoardingStore";
import { useAuth } from "../context/AuthContext";

export const NotificationPermission = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { setNotificationAllowed } = useOnboardingStore();
  const { user } = useAuth();

  const handleAllowNotifications = async () => {
    await Notifications.requestPermissionsAsync();
    setNotificationAllowed(true, user?.auth0_id);
    navigation.navigate("LocationPermission");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <VStack space="md" className="items-center">
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#F0F0F0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="notifications" size={52} color="#246BFD" />
        </View>
        <View className="mt-10 flex flex-col gap-3 px-6 items-center">
          <Text className="text-3xl font-semibold">
            Enable Notification Access
          </Text>
        </View>
        <View className="flex flex-col gap-3 px-16 items-center ">
          <Text className="text-gray-600 text-center leading-6">
            Enable notifications to receive real-time updates
          </Text>
        </View>
        <View className="mt-6 flex flex-col gap-3 px-6 items-center">
          <Button
            className="bg-[#246BFD] rounded-full w-full"
            size="xl"
            variant="solid"
            action="primary"
            onPress={handleAllowNotifications}
          >
            <ButtonText className="text-center w-full text-lg font-semibold">
              Allow Notification
            </ButtonText>
          </Button>
          <Button
            onPress={() => {
              setNotificationAllowed(false, user?.auth0_id);
              navigation.navigate("LocationPermission");
            }}
            size="xl"
            variant="link"
            action="primary"
          >
            <ButtonText className="text-center w-full text-md font-light text-gray-700">
              Maybe Later
            </ButtonText>
          </Button>
        </View>
      </VStack>
    </View>
  );
};
