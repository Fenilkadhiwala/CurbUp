import { Button, ButtonText } from "@/components/ui/button";
import { MoveRight } from "lucide-react-native";
import { Text, View } from "react-native";

export const CreditBox = () => {
  return (
    <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
      <View>
        <Text className="text-gray-400 text-sm font-normal mb-1">
          Your Credits
        </Text>
        <Text className="text-black text-4xl font-semibold tracking-tight">
          50
        </Text>
        <Text className="text-gray-400 text-sm font-normal mb-1">
          Earn more by reporting spots
        </Text>
      </View>
      <Button
        className="bg-[#246BFD] rounded-full gap-2"
        size="lg"
        variant="solid"
        action="primary"
      >
        <ButtonText className="text-white font-semibold">Set Alert</ButtonText>
        <MoveRight color="white" size={18} />
      </Button>
    </View>
  );
};
