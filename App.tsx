import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import HomeScreen from "./screens/HomeScreen";
import "./global.css";

export default function App() {
  return (
    <GluestackUIProvider>
      <HomeScreen />
    </GluestackUIProvider>
  );
}
