import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Groups from "../../app/Groups";
import DiscoverGroups from "../../app/DiscoverGroups";
import ManageGroups from "../../app/ManageGroups";

const TopTab = createMaterialTopTabNavigator();

const GroupTopNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Groups" component={Groups} />
      <TopTab.Screen name="Manage" component={ManageGroups} />
      <TopTab.Screen name="Discover" component={DiscoverGroups} />
    </TopTab.Navigator>
  );
};

export default GroupTopNavigator;
