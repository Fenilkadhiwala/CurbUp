import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.Text
        style={{ opacity }}
        className="text-black text-4xl font-bold tracking-widest"
      >
        CurbUp
      </Animated.Text>
    </View>
  );
}
