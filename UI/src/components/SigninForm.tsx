import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
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

export const SigninForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      // proceed with login
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-8">
      <View className="flex flex-col justify-center items-center">
        <Text className="text-2xl font-bold text-black">Welcome back</Text>
        <Text>Login to see what's open near you.</Text>
      </View>

      <View className="w-full flex flex-col gap-4 mt-10">
        {/* Email */}
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
                setEmail(val);
                setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
              }}
            />
          </Input>
          {errors.email ? (
            <Text className="text-red-500 text-sm">{errors.email}</Text>
          ) : null}
        </VStack>

        {/* Password */}
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
          <Checkbox
            value="remember"
            isDisabled={false}
            isInvalid={false}
            size="md"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-black">Remember me</CheckboxLabel>
          </Checkbox>
          <Button variant="link" size="md" action="primary">
            <ButtonText className="text-[#246BFD]">Forgot password?</ButtonText>
          </Button>
        </View>

        <Button
          className="bg-[#246BFD] rounded-full mt-6"
          size="xl"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
        >
          <ButtonText>Sign In</ButtonText>
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
