import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Events from "../../app/events/Events";
import YourEvents from "../../app/events/YourEvents";

const TopTab = createMaterialTopTabNavigator();

const EventTopNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Top events" component={Events} />
      <TopTab.Screen name="Your Events" component={YourEvents} />
    </TopTab.Navigator>
  );
};

export default EventTopNavigator;
