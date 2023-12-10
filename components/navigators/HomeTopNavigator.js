import { View, Text } from "react-native";
import React from "react";
import Feeds from "../../app/Feeds";
import Home from "../../app/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

const HomeTopNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="News" component={Home} />
      <TopTab.Screen name="Feed" component={Feeds} />
    </TopTab.Navigator>
  );
};

export default HomeTopNavigator;
