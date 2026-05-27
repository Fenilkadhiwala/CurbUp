import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "react-native";
import useUserStore from "@/store/useUserStore";
import { MapPin, LogOut } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";

export const TopHorizontalBar = () => {
  const { user } = useUserStore();

  const { signout } = useAuth();

  return (
    <HStack className="items-center justify-between px-6 py-2">
      <Avatar className="bg-[#246BFD]">
        <AvatarFallbackText className="text-white">
          {user?.full_name}
        </AvatarFallbackText>
        <AvatarBadge />
      </Avatar>

      <HStack className="items-center bg-gray-100 px-4 py-4 rounded-full gap-2">
        <MapPin size={18} color="#246BFD" />
        <Text className="text-gray-700 text-md font-light">
          Jersey City NJ, 07306
        </Text>
      </HStack>

      <Box className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
        <LogOut
          onPress={() => {
            signout();
          }}
          size={19}
        ></LogOut>
      </Box>
    </HStack>
  );
};
