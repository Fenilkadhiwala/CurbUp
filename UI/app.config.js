export default {
  expo: {
    name: "curbup",
    slug: "curbup",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic", // ← fixes the warning too
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    scheme: "com.fenil.curbup", // ← required for Auth0 redirect
    extra: {
      AUTH0_DOMAIN: process.env.EXPO_AUTH0_DOMAIN,
      AUTH0_CLIENTID: process.env.EXPO_AUTH0_CLIENTID,
      MAPBOX_ACCESSTOKEN: process.env.EXPO_MAPBOX_ACCESSTOKEN,
    },
    plugins: [
      "expo-asset",
      "expo-dev-client",
      "expo-secure-store",
      "expo-web-browser",
      "expo-font",
      [
        "react-native-auth0",
        {
          domain: "dev-zimg1mbiu86etijo.us.auth0.com",
        },
      ],
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.fenil.curbup",
    },
    android: {
      package: "com.fenil.curbup",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/android-icon-foreground.png",
        backgroundImage: "./assets/android-icon-background.png",
        monochromeImage: "./assets/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
