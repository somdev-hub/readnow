import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../DrawerContent";
import HomeTopNavigator from "./HomeTopNavigator";
import HeaderMenu from "../HeaderMenu";
import TabNavigator from "./TabNavigator";
import { PRIMARY_COLOR } from "../../styles/colors";
import { useRoute } from "@react-navigation/native";
import { useCollapsibleHeader } from "react-navigation-collapsible";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const collapsible = useCollapsibleHeader({
    navigationOptions: {
      headerStyle: { backgroundColor: PRIMARY_COLOR },
      headerTitle: () => <HeaderMenu title={"ReadNow"} />
    }
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "white", 
        drawerInactiveTintColor: "white",
        headerShown: false,
        drawerIcon: () => null,
        headerStyle: {
          elevation: 1
          // backgroundColor: "#39A7FF"
        }
        // headerTitle: () => <HeaderMenu />
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomePage"
        component={TabNavigator}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: PRIMARY_COLOR
          },
          headerTitle: () => <HeaderMenu title={"ReadNow"} />
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
