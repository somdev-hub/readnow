import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStorage from "expo-secure-store";
import { login } from "../api/apis";
// import { useAuth } from "../contexts/AuthContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: null,
    login: false
  });

  useEffect(() => {
    SecureStorage.getItemAsync("token").then((token) => {
      if (token) {
        setUser(token);
      }
    });
  }, []);

  const signIn = async (userCredentials) => {
    const response = await login(userCredentials);
    if (response.status === 200) {
      console.log(response.token);
      await Promise.all([
        SecureStorage.deleteItemAsync("email"),
        SecureStorage.deleteItemAsync("token")
      ]);
      await Promise.all([
        SecureStorage.setItemAsync(
          "email",
          userCredentials.email.toLowerCase()
        ),
        SecureStorage.setItemAsync("token", response.token)
      ]);
      const user = {
        token: response.token,
        login: true
      };
      setUser(user);
      return user;
    } else {
      const user = {
        token: null,
        login: false
      };
      setUser(user);
      return user;
    }
  };

  const signOut = async () => {
    await SecureStorage.deleteItemAsync("token");
    await SecureStorage.deleteItemAsync("email");
    setUser({
      token: null,
      login: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
