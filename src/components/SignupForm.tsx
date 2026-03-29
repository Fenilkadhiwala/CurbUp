import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SocialLoginSection } from "./SocialLoginSection";
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validate";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { formatPhoneNumber } from "../utils/commonFunctions";

export const SignupForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    const newErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      phoneNumber: validatePhoneNumber(phoneNumber),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (!hasErrors) {
      // proceed with sign up
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-8 mt-6">
      <View className="flex flex-col justify-center items-center">
        <Text className="text-2xl font-bold text-black">
          Stop circling. Start parking.
        </Text>
        <Text>Join your neighbors. Find a spot faster.</Text>
      </View>

      <View className="w-full flex flex-col gap-3 mt-10">
        {/* Full Name */}
        <VStack space="xs">
          <Text className="text-black">Full Name</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent data-[focus=true]:border-transparent ${
              errors.fullName ? "border border-red-500" : ""
            }`}
          >
            <InputField
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChangeText={(val) => {
                setFullName(val);
                setErrors((prev) => ({
                  ...prev,
                  fullName: validateFullName(val),
                }));
              }}
            />
          </Input>
          {errors.fullName ? (
            <Text className="text-red-500 text-sm">{errors.fullName}</Text>
          ) : null}
        </VStack>

        {/* Email */}
        <VStack space="xs">
          <Text className="text-black">Email</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent data-[focus=true]:border-transparent ${
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

        {/* Phone Number */}
        <VStack space="xs">
          <Text className="text-black">Phone Number</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent data-[focus=true]:border-transparent ${
              errors.phoneNumber ? "border border-red-500" : ""
            }`}
          >
            <InputField
              type="text"
              placeholder="(123) 456 7890"
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={(val) => {
                const formatted = formatPhoneNumber(val);
                setPhoneNumber(formatted);
                setErrors((prev) => ({
                  ...prev,
                  phoneNumber: validatePhoneNumber(formatted),
                }));
              }}
            />
          </Input>
          {errors.phoneNumber ? (
            <Text className="text-red-500 text-sm">{errors.phoneNumber}</Text>
          ) : null}
        </VStack>

        {/* Password */}
        <VStack space="xs">
          <Text className="text-black">Password</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent data-[focus=true]:border-transparent ${
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

        {/* Confirm Password */}
        <VStack space="xs">
          <Text className="text-black">Confirm Password</Text>
          <Input
            variant="rounded"
            size="xl"
            className={`rounded-2xl bg-gray-100 border-transparent data-[focus=true]:border-transparent ${
              errors.confirmPassword ? "border border-red-500" : ""
            }`}
          >
            <InputField
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: validateConfirmPassword(password, val),
                }));
              }}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="gray"
              />
            </InputSlot>
          </Input>
          {errors.confirmPassword ? (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword}
            </Text>
          ) : null}
        </VStack>

        <Button
          className="bg-[#246BFD] rounded-full mt-6"
          size="xl"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
        >
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </View>

      <View className="flex flex-col justify-center items-center">
        <SocialLoginSection />
        <View className="flex flex-row justify-center items-center mt-6 gap-1">
          <Text className="text-typography-500">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text className="text-[#246BFD] font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
