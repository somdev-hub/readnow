import "react-native-gesture-handler";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Web, Bookmarks, Profile, Article } from "./app/index";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import HeaderMenu from "./components/HeaderMenu";
import { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feeds from "./app/Feeds";
import Welcome from "./app/Welcome";
import SignUp from "./app/SignUp";
import Login from "./app/Login";
import MyProfile from "./app/MyProfile";
import People from "./app/People";
import PeopleProfile from "./app/PeopleProfile";
import Story from "./app/Story";
import DrawerContent from "./components/DrawerContent";
import AddPost from "./app/AddPost";
import AddInfo from "./app/AddInfo";
import * as SecureStorage from "expo-secure-store";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { addBookmark, decodeUser } from "./api/apis";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPost, postFormData } from "./redux/postSlice";
import { PaperProvider, Menu } from "react-native-paper";
import ArticlePage from "./app/ArticlePage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

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
  const [token, setToken] = useState(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postData);
  const Switch = useSelector((state) => state.post.switch);
  const bookmarkSelector = useSelector((state) => state.bookmark);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  useEffect(() => {
    const decodeToken = async () => {
      const token = await SecureStorage.getItemAsync("token");

      if (token) {
        setToken(token);
        decodeUser(token)
          .then((response) => {
            console.log(response);
            if (response.status != 200) {
              SecureStorage.deleteItemAsync("token");
              SecureStorage.deleteItemAsync("email");
              navigator.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Welcome" }]
                })
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }]
          })
        );
      }
    };
    decodeToken();
  }, [token]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="Web" component={Web} />
      <Stack.Screen
        name="Article"
        component={ArticlePage}
        options={{
          // headerTintColor:"#fff",
          headerShown: true,
          headerTitle: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Article</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <Entypo
                      onPress={openMenu}
                      name="dots-three-vertical"
                      size={20}
                      color="black"
                    />
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      addBookmark(
                        bookmarkSelector.bookmark,
                        bookmarkSelector.type,
                        bookmarkSelector.email
                      ).then((data) => {
                        console.log(data);
                      });
                      closeMenu();
                    }}
                    title="Add to Bookmark"
                  />
                  <Menu.Item onPress={() => {}} title="Add to Story" />
                  <Menu.Item onPress={() => {}} title="Repost" />
                  <Menu.Item onPress={() => {}} title="Share" />
                  <Menu.Item onPress={() => {}} title="Send" />
                </Menu>
              </View>
            );
          }
        }}
      />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="AddInfo" component={AddInfo} />
      <Stack.Screen
        name="Add Post"
        component={AddPost}
        options={{
          headerShown: true,
          headerTitle: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  Add Post
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log(postData);
                    dispatch(postFormData(postData));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#39A7FF"
                    }}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
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

const HomeTopNavigator = () => {
  return (
    <TopTab.Navigator
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: "#39A7FF"
      //   },
      //   // tabBarLabel: {
      //   //   color: "#fff"
      //   // }
      //   tabBarLabelStyle:{
      //     color:"#fff"
      //   }
      // }}
    >
      <TopTab.Screen name="News" component={Home} />
      <TopTab.Screen name="Feed" component={Feeds} />
    </TopTab.Navigator>
  );
};

const navigationItems = [
  {
    name: "Home",
    component: DrawerNavigator,
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
              headerShown: item.name === "Home" ? false : true,
              headerStyle: {
                backgroundColor: "#39A7FF",
                elevation: 10
              },
              headerTintColor: "#fff",
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
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent("project2", () => App);
