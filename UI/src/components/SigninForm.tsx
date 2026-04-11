import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SocialLoginSection } from "./SocialLoginSection";
import { validateEmail, validatePassword } from "../utils/validate";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { handleSignin } from "../api";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../context/AuthContext";
import { formatEmail } from "../utils/commonFunctions";

export const SigninForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const { setToken, setUser } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError, api: "" });

    if (!emailError && !passwordError) {
      try {
        const loginResponse: any = await handleSignin(email, password);
        const accessToken = loginResponse.data.access_token;
        await SecureStore.setItemAsync("accessToken", accessToken);
        setToken(accessToken);
        setIsLoading(false);
        setUser(loginResponse?.data?.user);
      } catch (error: any) {
        setIsLoading(false);
        setErrors((prev: any) => ({
          ...prev,
          api: error.message,
        }));
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-8">
      <View className="flex flex-col justify-center items-center">
        <Text className="text-2xl font-bold text-black">Welcome back</Text>
        <Text>Login to see what's open near you.</Text>
      </View>

      <View className="w-full flex flex-col gap-4 mt-10">
        <VStack space="xs">
          <Text className="text-black">Email</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent focus:border-transparent data-[focus=true]:border-transparent ${
              errors.email ? "border border-red-500" : ""
            }`}
          >
            <InputField
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={(val) => {
                const formattedEmail = formatEmail(val);

                setEmail(formattedEmail);
                setErrors((prev) => ({
                  ...prev,
                  email: validateEmail(formattedEmail),
                }));
              }}
            />
          </Input>
          {errors.email ? (
            <Text className="text-red-500 text-sm">{errors.email}</Text>
          ) : null}
        </VStack>

        <VStack space="xs">
          <Text className="text-black">Password</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent focus:border-transparent data-[focus=true]:border-transparent ${
              errors.password ? "border border-red-500" : ""
            }`}
          >
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                setErrors((prev) => ({
                  ...prev,
                  password: validatePassword(val),
                }));
              }}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="gray"
              />
            </InputSlot>
          </Input>
          {errors.password ? (
            <Text className="text-red-500 text-sm">{errors.password}</Text>
          ) : null}
        </VStack>

        <View className="flex flex-row items-center justify-between">
          <Button
            onPress={() => {
              navigation?.navigate("ForgotPassword");
            }}
            variant="link"
            size="md"
            action="primary"
          >
            <ButtonText className="text-[#246BFD]">Forgot password?</ButtonText>
          </Button>
        </View>
        {errors?.api && (
          <Text style={{ color: "#ef4444", marginBottom: 4 }}>
            Invalid email or password
          </Text>
        )}
        <Button
          className="bg-[#246BFD] rounded-full mt-6"
          size="xl"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
        >
          {isLoading ? (
            <>
              <ButtonSpinner color="white" />
              <ButtonText>Signing In</ButtonText>
            </>
          ) : (
            <ButtonText>Sign In</ButtonText>
          )}
        </Button>
      </View>

      <View className="flex flex-col justify-center items-center">
        <SocialLoginSection />
        <View className="flex flex-row justify-center items-center mt-6 gap-1">
          <Text className="text-typography-500">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-[#246BFD] font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
