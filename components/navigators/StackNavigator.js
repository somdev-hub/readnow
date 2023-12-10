import "react-native-gesture-handler";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { addBookmark, decodeUser } from "../../api/apis";
import { useDispatch } from "react-redux";
import { postFormData } from "../../redux/postSlice";
import TabNavigator from "./TabNavigator";
import { Menu } from "react-native-paper";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../../app/Welcome";
import SignUp from "../../app/SignUp";
import Login from "../../app/Login";
import Story from "../../app/Story";
import AddInfo from "../../app/AddInfo";
import Groups from "../../app/Groups";
import AddPost from "../../app/AddPost";
import MyProfile from "../../app/MyProfile";
import People from "../../app/People";
import PeopleProfile from "../../app/PeopleProfile";
import ArticlePage from "../../app/ArticlePage";
import ViewPost from "../../app/ViewPost";
import Web from "../../app/Web";
import GroupTopNavigator from "./GroupTopNavigator";
// import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [token, setToken] = useState(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postData);
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
        name="Post"
        component={ViewPost}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticlePage}
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
                      dispatch({
                        type: "notify/addNewsBookmark",
                        payload: {
                          addToNewsBookmark: true
                        }
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
        name="GroupsPage"
        component={GroupTopNavigator}
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
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Groups</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#39A7FF"
                    }}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
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

export default StackNavigator;
