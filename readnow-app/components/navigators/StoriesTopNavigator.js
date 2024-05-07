import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Publishers from "../../app/stories/Publishers";
import YourPublishers from "../../app/stories/YourPublishers";

const TopTab = createMaterialTopTabNavigator();

const StoriesTopNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Publishers" component={Publishers} />
      <TopTab.Screen name="Your Publishers" component={YourPublishers} />
    </TopTab.Navigator>
  );
};

export default StoriesTopNavigator;
