import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { validateEmail } from "../utils/validate";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { handleForgotPassword } from "../api";
import { formatEmail } from "../utils/commonFunctions";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { CheckCircleIcon, Icon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";
import { XCircle } from "lucide-react-native";

export const ForgotPasswordForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "" });
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    const emailError = validateEmail(email);
    setErrors({ email: emailError });

    if (!emailError) {
      try {
        await handleForgotPassword(email);
        toast.show({
          placement: "top right",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Toast
                nativeID={toastId}
                className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row"
                style={{ maxWidth: "90%", alignSelf: "center" }}
              >
                <Icon
                  as={CheckCircleIcon}
                  size="xl"
                  className="stroke-green-500"
                />
                <Divider
                  orientation="vertical"
                  className="h-[30px] bg-outline-200"
                />
                <ToastTitle className="mr-10" size="sm">
                  If this email is registered, you'll receive a password reset
                  link.
                </ToastTitle>
              </Toast>
            );
          },
        });
      } catch (error: any) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Toast
                nativeID={toastId}
                className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row"
              >
                <Icon as={XCircle} size="xl" className="stroke-red-500" />
                <Divider
                  orientation="vertical"
                  className="h-[30px] bg-outline-200"
                />
                <ToastTitle size="sm">{error.message}</ToastTitle>
              </Toast>
            );
          },
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-8">
      <View className="flex flex-col justify-center items-center">
        <Text className="text-2xl font-bold text-black">Forgot Password?</Text>
        <Text className="mt-2">Enter your email to receive a reset link.</Text>
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
              <ButtonText>Submitting</ButtonText>
            </>
          ) : (
            <ButtonText>Submit</ButtonText>
          )}
        </Button>
      </View>

      <View className="flex flex-col justify-center items-center">
        <View className="flex flex-row justify-center items-center mt-6 gap-1">
          <Text className="text-typography-500">Back to signin?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text className="text-[#246BFD] font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
