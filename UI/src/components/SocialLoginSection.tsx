import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export const SocialLoginSection = () => {
  return (
    <View className="w-full mt-6">
      {/* OR divider */}
      <View className="flex flex-row items-center gap-3 mb-6">
        <Divider className="flex-1" />
        <Text className="text-typography-400 text-sm">Or Continue with</Text>
        <Divider className="flex-1" />
      </View>

      {/* Social buttons */}
      <View className="flex flex-row justify-center gap-4">
        {/* Apple */}
        <TouchableOpacity className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white">
          <FontAwesome6 name="google" size={24} color="#000000" />
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white">
          <FontAwesome6 name="apple" size={24} color="#000000" />
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white">
          <FontAwesome6 name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>

      {/* Already have account */}
    </View>
  );
};
