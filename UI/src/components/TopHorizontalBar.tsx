import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "react-native";
import useUserStore from "@/store/useUserStore";
import { Bell, MapPin } from "lucide-react-native";

export const TopHorizontalBar = () => {
  const { user } = useUserStore();

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
        <Bell size={19}></Bell>
      </Box>
    </HStack>
  );
};
