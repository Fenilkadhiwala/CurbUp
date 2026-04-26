import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import useOnboardingStore from "@/store/useOnBoardingStore";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import * as Location from "expo-location";

export const LocationPermission = () => {
  const { setOnboardingComplete } = useOnboardingStore();
  const handleAllowLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
    setOnboardingComplete();
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
          <Ionicons name="location-sharp" size={52} color="#246BFD" />
        </View>
        <View className="mt-10 flex flex-col gap-3 px-6 items-center">
          <Text className="text-3xl font-semibold">What is Your Location?</Text>
        </View>
        <View className="flex flex-col gap-3 px-16 items-center ">
          <Text className="text-gray-600 text-center leading-6">
            See what's open on your block — share your location to get started
          </Text>
        </View>
        <View className="mt-6 flex flex-col gap-3 px-6 items-center">
          <Button
            className="bg-[#246BFD] rounded-full w-full"
            size="xl"
            variant="solid"
            action="primary"
            onPress={handleAllowLocation}
          >
            <ButtonText className="text-center w-full text-lg font-semibold">
              Enable Location
            </ButtonText>
          </Button>
          <Button size="xl" variant="link" action="primary">
            <ButtonText className="text-center w-full text-md font-light text-gray-700">
              Maybe Later
            </ButtonText>
          </Button>
        </View>
      </VStack>
    </View>
  );
};
