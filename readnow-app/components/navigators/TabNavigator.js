import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
// import DrawerNavigator from "./DrawerNavigator";
import People from "../../app/People";
import Bookmarks from "../../app/Bookmarks";
import Profile from "../../app/Profile";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import HomeTopNavigator from "./HomeTopNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navStyles = StyleSheet.create({
    activeButton: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: PRIMARY_COLOR,
      flexDirection: "row",
      gap: 3,
      borderRadius: 50,
      padding: 10
    }
  });
  const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: WHITE_COLOR,
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
  const bookmarkNotification = useSelector(
    (state) => state.notify.addedToBookmark
  );

  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator screenOptions={screenOptions}>
        {navigationItems.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: PRIMARY_COLOR,
                  elevation: 10
                },
                headerTintColor: WHITE_COLOR,
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
                      color={focused ? WHITE_COLOR : "#A9A9A9"}
                    />
                    {focused && (
                      <Text
                        style={{
                          color: WHITE_COLOR,
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
      <Snackbar
        visible={bookmarkNotification.addToBookmark}
        style={{ position: "absolute", bottom: 60 }}
        onDismiss={() => {}}
        action={{
          label: "Done",
          onPress: () => {
            dispatch({
              type: "notify/addBookmark",
              payload: {
                addToBookmark: false
              }
            });
          }
        }}
      >
        Added to Bookmarks
      </Snackbar>
    </View>
  );
};

export default TabNavigator;
