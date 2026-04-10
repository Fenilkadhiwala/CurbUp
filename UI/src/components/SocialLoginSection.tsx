import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../context/AuthContext";
import { useSocialLogin } from "../hooks/useSocialAuth";
import { createUserInDatabase } from "../api";

export const SocialLoginSection = () => {
  const { setToken, setUser } = useAuth();
  const { loginWithSocial } = useSocialLogin();
  const handleSocialLogin = async (
    provider: "google-oauth2" | "apple" | "facebook",
  ) => {
    try {
      const { accessToken, user }: any = await loginWithSocial(provider);

      await SecureStore.setItemAsync("accessToken", accessToken!);
      setToken(accessToken!);

      const response: any = await createUserInDatabase(
        user?.email,
        user?.name,
        "",
        accessToken!,
      );

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-full mt-6">
      <View className="flex flex-row items-center gap-3 mb-6">
        <Divider className="flex-1" />
        <Text className="text-typography-400 text-sm">Or Continue with</Text>
        <Divider className="flex-1" />
      </View>

      <View className="flex flex-row justify-center gap-4">
        <TouchableOpacity
          onPress={() => handleSocialLogin("google-oauth2")}
          className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white"
        >
          <FontAwesome6 name="google" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialLogin("apple")}
          className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white"
        >
          <FontAwesome6 name="apple" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialLogin("facebook")}
          className="w-16 h-16 rounded-full border border-outline-200 items-center justify-center bg-white"
        >
          <FontAwesome6 name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
