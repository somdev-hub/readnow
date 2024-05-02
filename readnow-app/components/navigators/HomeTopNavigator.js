import { View, Text } from "react-native";
import React from "react";
import Feeds from "../../app/Feeds";
import Home from "../../app/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PRIMARY_COLOR } from "../../styles/colors";

const TopTab = createMaterialTopTabNavigator();

const HomeTopNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: PRIMARY_COLOR,
          elevation:0
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray"
      }}
    >
      <TopTab.Screen name="News" component={Home} />
      <TopTab.Screen name="Feed" component={Feeds} />
    </TopTab.Navigator>
  );
};

export default HomeTopNavigator;
