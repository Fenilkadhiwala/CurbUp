import { View } from "react-native";
import { TopHorizontalBar } from "../components/TopHorizontalBar";
import { Map } from "../components/Map";
import { CreditBox } from "../components/CreditBox";
import { FindParkingSpotInput } from "../components/FindParkingSpotInput";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <View className="flex-1">
      <TopHorizontalBar />
      <CreditBox />
      <FindParkingSpotInput />
      <View className="h-[35%] m-4 rounded-2xl overflow-hidden">
        <Map />
      </View>
      <Navbar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}
