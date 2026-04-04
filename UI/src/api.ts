import axios from "axios";

import Constants from "expo-constants";

const authDomain = Constants.expoConfig?.extra?.AUTH0_DOMAIN;
const authClientID = Constants.expoConfig?.extra?.AUTH0_CLIENTID;

export const handleSignup = async (email: string, password: string) => {
  try {
    await axios.post(`https://${authDomain}/dbconnections/signup`, {
      client_id: authClientID,
      email,
      password,
      connection: "Username-Password-Authentication",
    });
  } catch (error) {
    console.error("Something went wrong while creating user in Auth0", error);
  }
};

export const handleSignin = async (email: string, password: string) => {
  try {
    const loginResponse = await axios.post(
      `https://${authDomain}/oauth/token`,
      {
        grant_type: "password",
        username: email,
        password,
        audience: "https://api.curbup.com",
        scope: "openid profile email",
        client_id: authClientID,
      },
    );

    return loginResponse;
  } catch (error) {
    console.error("Something went wrong while signing in user", error);
  }
};

export const createUserInDatabase = async (
  email: string,
  fullName: string,
  phoneNumber: string,
  accessToken: string,
) => {
  try {
    const response = await axios.post(
      "http://192.168.1.166:3000/api/create-user",
      {
        email,
        fullName,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error) {
    console.log("Something went wrong while creating user in database", error);
  }
};
