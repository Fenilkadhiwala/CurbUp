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
        scope: "openid profile email",
        audience: "https://api.curbup.com",
        additionalParameters: {
          prompt: "select_account",
        },
      });

      const credentials = await getCredentials();
      const accessToken = credentials?.accessToken;

      return { accessToken, user };
    } catch (error) {
      console.error("Social login error:", error);
      throw error;
    }
  };

  return { loginWithSocial };
};
