import "react-native-gesture-handler";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Web, Bookmarks, Profile, Article } from "./app/index";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./app/Welcome";
import SignUp from "./app/SignUp";
import Login from "./app/Login";
import MyProfile from "./app/MyProfile";
import People from "./app/People";
import PeopleProfile from "./app/PeopleProfile";
import { Entypo } from "@expo/vector-icons";
import HeaderMenu from "./components/HeaderMenu";
import { Drawer } from "react-native-drawer-layout";
import { useState } from "react";
import Feeds from "./app/Feeds";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: "#fff",
    borderTopColor: "#eeeeee",
    borderTopWidth: 2,
    paddingVertical: 5,
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60
  }
};
const navStyles = StyleSheet.create({
  activeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#39A7FF",
    flexDirection: "row",
    gap: 3,
    borderRadius: 50,
    padding: 10
  }
});

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="Web" component={Web} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Myprofile"
        component={MyProfile}
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerMode: "screen"
        }}
      />
      <Stack.Screen name="People" component={People} />
      <Stack.Screen
        name="PeopleProfile"
        component={PeopleProfile}
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerMode: "screen"
        }}
      />
    </Stack.Navigator>
  );
};

// const MainDrawer = () => {
//   const [drawer, setDrawer] = useState(false);
//   <Drawer
//     open={drawer}
//     drawerWidth={500}
//     // drawerPosition="right"
//     onOpen={() => {
//       setDrawer(true);
//     }}
//     onClose={() => {
//       setDrawer(false);
//     }}
//     renderDrawerContent={() => {
//       return <DrawerContent />;
//     }}
//   >
//     <Home />
//   </Drawer>;
// };

const HomeTopNavigator = () => {
  return (
    <TopTab.Navigator initialRouteName="News">
      <TopTab.Screen name="News" component={Home} />
      <TopTab.Screen name="Feed" component={Feeds} />
    </TopTab.Navigator>
  );
};

const navigationItems = [
  {
    name: "Home",
    component: HomeTopNavigator,
    icon: "home"
  },
  {
    name: "People",
    component: People,
    icon: "globe"
  },
  {
    name: "Bookmarks",
    component: Bookmarks,
    icon: "bookmark"
  },
  {
    name: "Profile",
    component: Profile,
    icon: "user"
  }
];

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {navigationItems.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              headerShown: true,
              // headerStyle: {
              //   height: item.name === "Home" ? 120 : undefined
              // },
              headerTitle:
                item.name == "Home" ? () => <HeaderMenu /> : item.name,
              tabBarIcon: ({ focused }) => (
                <View
                  style={
                    focused
                      ? [navStyles.activeButton]
                      : { alignItems: "center", justifyContent: "center" }
                  }
                >
                  <Feather
                    name={item.icon}
                    size={focused ? 18 : 24}
                    color={focused ? "#fff" : "#A9A9A9"}
                  />
                  {focused && (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.name}
                    </Text>
                  )}
                </View>
              )
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

// AppRegistry.registerComponent("project2", () => App);
