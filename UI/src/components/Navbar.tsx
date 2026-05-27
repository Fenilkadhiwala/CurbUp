import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TABS } from "../utils/constants";

export default function Navbar({ activeTab, onTabPress }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-[18px] right-[18px] z-50"
      style={{ bottom: insets.bottom + 12 }}
    >
      <View className="flex-row items-center justify-around bg-white/95 rounded-[28px] py-2.5 px-2 shadow-lg shadow-black/20">
        {TABS.map(({ key, label, Icon, badge }) => {
          const isActive = activeTab === key;
          return (
            <TouchableOpacity
              key={key}
              className="items-center gap-1 min-w-[60px]"
              onPress={() => onTabPress(key)}
              activeOpacity={0.8}
            >
              <View
                className={`w-11 h-11 rounded-full items-center justify-center ${
                  isActive ? "bg-blue-600" : "bg-transparent"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  color={isActive ? "#fff" : "#8e8e93"}
                />
                {badge && !isActive && (
                  <View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white" />
                )}
              </View>
              <Text
                className={`text-[10px] ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400 font-medium"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
