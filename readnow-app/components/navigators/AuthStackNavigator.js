import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../../app/Welcome";
import SignUp from "../../app/profile/SignUp";
import Login from "../../app/profile/Login";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
