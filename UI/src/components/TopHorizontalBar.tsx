import { HStack } from "@/components/ui/hstack";
import { Text, View } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { getCoords } from "../utils/commonFunctions";
import * as Location from "expo-location";
import useOnboardingStore from "@/store/useOnBoardingStore";

export const TopHorizontalBar = () => {
  const [streetName, setStreetName] = useState("");
  const { isLocationSharingAllowed } = useOnboardingStore();

  const getStreetFromCoords = async (coords: any) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coords[1],
        longitude: coords[0],
      });

      if (address.length > 0) {
        const place: any = address[0];

        setStreetName(place?.street);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchLocation = async () => {
      const coords = await getCoords();
      getStreetFromCoords(coords);
    };

    fetchLocation();
  }, []);
  return (
    <View className="px-4 pt-1 flex-row justify-between items-center">
      <HStack className="flex items-center justify-center gap-1">
        <Text className="text-lg font-semibold">
          {isLocationSharingAllowed ? streetName : "Set your location"}
        </Text>
        <ChevronDown size={18} />
      </HStack>
    </View>
  );
};
