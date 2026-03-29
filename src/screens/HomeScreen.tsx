import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text size="xl">Hello Gluestack</Text>
      <Button onPress={() => console.log("clicked")}>
        <ButtonText>Click Me</ButtonText>
      </Button>
    </View>
  );
}
