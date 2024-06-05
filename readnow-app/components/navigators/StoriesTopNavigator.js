import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Publishers from "../../app/editorials/Publishers";
import YourPublishers from "../../app/editorials/YourPublishers";


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
