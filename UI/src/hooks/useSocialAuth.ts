import { useAuth0, Auth0Provider } from "react-native-auth0";

export const useSocialLogin = () => {
  const { authorize, user, getCredentials } = useAuth0();

  const loginWithSocial = async (
    connection: "google-oauth2" | "apple" | "facebook",
  ) => {
    try {
      await authorize({
        connection,
        redirectUrl: "com.fenil.curbup://auth0callback",
      });

      const credentials = await getCredentials();
      const accessToken = credentials?.accessToken;

      console.log("user and token", user, accessToken);

      return { accessToken, user };
    } catch (error) {
      console.error("Social login error:", error);
      throw error;
    }
  };

  return { loginWithSocial };
};
