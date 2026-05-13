import { View } from "react-native";
import { TopHorizontalBar } from "../components/TopHorizontalBar";
import { Map } from "../components/Map";
import { CreditBox } from "../components/CreditBox";
import { FindParkingSpotInput } from "../components/FindParkingSpotInput";

export default function Dashboard() {
  return (
    <View className="flex-1">
      <TopHorizontalBar />
      <CreditBox />
      <FindParkingSpotInput />
      <View className="h-[35%] m-4 rounded-2xl overflow-hidden">
        <Map />
      </View>
    </View>
  );
}
