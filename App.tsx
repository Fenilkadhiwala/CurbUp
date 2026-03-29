import "./global.css";
import { useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScree";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <GluestackUIProvider>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <HomeScreen />
      )}
    </GluestackUIProvider>
  );
}
