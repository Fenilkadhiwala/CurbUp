import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { signout } = useAuth();
  const handleSignout = () => {
    signout();
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text size="xl">Hello Gluestack</Text>
      <Button onPress={() => handleSignout()}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </View>
  );
}
