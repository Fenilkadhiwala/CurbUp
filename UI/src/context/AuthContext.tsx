import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    auth0_id: "",
    email: "",
    full_name: "",
    phone_number: "",
  });

  useEffect(() => {
    SecureStore.getItemAsync("accessToken").then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  const signout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
