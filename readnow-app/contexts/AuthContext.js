import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStorage from "expo-secure-store";
import { login } from "../api/apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    SecureStorage.getItemAsync("token").then((token) => {
      if (token) {
        setUser(token);
      }
    });
  }, []);

  const signIn = async (userCredentials) => {
    const { data } = await login(userCredentials);
    await SecureStorage.setItemAsync("token", data.token);
    // await SecureStorage.setItemAsync("email", userCredentials.email);
    setUser({
      token: data.token
    });
  };

  const signOut = async () => {
    await SecureStorage.deleteItemAsync("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
