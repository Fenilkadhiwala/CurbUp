import "../global.css";
import { useState } from "react";
import { View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import SplashScreen from "./screens/SplashScreen";
import AppNavigator from "./navigation/AppNavigator";
import { config } from "../components/ui/gluestack-ui-provider/config";
import { AuthProvider } from "./context/AuthContext";
import { Auth0Provider } from "react-native-auth0";
import Constants from "expo-constants";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  return (
    <Auth0Provider
      domain={Constants.expoConfig?.extra?.AUTH0_DOMAIN}
      clientId={Constants.expoConfig?.extra?.AUTH0_CLIENTID}
    >
      <AuthProvider>
        {" "}
        <View style={[config.light, { flex: 1 }]}>
          <GluestackUIProvider mode={colorMode}>
            {showSplash ? (
              <SplashScreen onFinish={() => setShowSplash(false)} />
            ) : (
              <AppNavigator />
            )}
          </GluestackUIProvider>
        </View>
      </AuthProvider>
    </Auth0Provider>
  );
}
