import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../DrawerContent";
import HomeTopNavigator from "./HomeTopNavigator";
import HeaderMenu from "../HeaderMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerIcon: () => null }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomePage"
        component={HomeTopNavigator}
        options={{
          headerShown: true,
          headerStyle: {
            // backgroundColor: "#39A7FF"
          },
          headerTitle: () => <HeaderMenu />
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
