import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStorage from "expo-secure-store";
import { decodeUser } from "../../api/apis";
import { updateIsLoggedIn } from "../../redux/authSlice";
import StackNavigator from "./StackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  useEffect(() => {
    const decodeToken = async () => {
      const token = await SecureStorage.getItemAsync("token");

      if (token) {
        setToken(token);
        decodeUser(token)
          .then((response) => {
            console.log(response);
            if (response.status != 200) {
              SecureStorage.deleteItemAsync("token");
              SecureStorage.deleteItemAsync("email");
              // setLoggedIn(false);
              dispatch(updateIsLoggedIn(false));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch(updateIsLoggedIn(false));
      }
    };
    decodeToken();
    // getUser();
  }, [token]);
  return isLoggedIn ? <StackNavigator /> : <AuthStackNavigator />;
};

export default Navigation;
