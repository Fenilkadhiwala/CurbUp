import { SearchIcon } from "lucide-react-native";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

export const FindParkingSpotInput = () => {
  return (
    <View className="flex-row items-center px-4 py-2 gap-3">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 gap-3">
        <SearchIcon size={18} color="#246BFD" />
        <TextInput
          placeholder="Find Parking Spot"
          placeholderTextColor="#9ca3af"
          className="flex-1 text-md text-gray-700"
        />
      </View>
    </View>
  );
};
