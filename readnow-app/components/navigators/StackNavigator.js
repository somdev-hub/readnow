import "react-native-gesture-handler";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  addBookmark,
  decodeUser,
  getShortProfileInfo,
  socket
} from "../../api/apis";
import { useDispatch } from "react-redux";
import { postFormData, postGroupFormData } from "../../redux/postSlice";
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
import ViewGroupInfo from "../../app/ViewGroupInfo";
import GroupDetails from "../../app/GroupDetails";
import CreateGroup from "../../app/CreateGroup";
import GroupSettings from "../../app/GroupSettings";
import { postGroupData } from "../../redux/groupSlice";
import GroupGenreSelection from "../../app/GroupGenreSelection";
import GroupNewView from "../../app/GroupNewView";
import Events from "../../app/Events";
import EventPage from "../../app/EventPage";
import { AntDesign } from "@expo/vector-icons";
import CreateEvent from "../../app/CreateEvent";
import AdminEventPage from "../../app/AdminEventPage";
import { postEventData } from "../../redux/eventSlice";
import { PRIMARY_COLOR } from "../../styles/colors";
import EventTopNavigator from "./EventTopNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { CollapsibleScrollView } from "react-navigation-collapsible";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [token, setToken] = useState(null);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postData);
  const bookmarkSelector = useSelector((state) => state.bookmark);
  const groupData = useSelector((state) => state.group.groupData);
  const postVisibilityModal = useSelector(
    (state) => state.post.selectVisibility
  );
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const postVisibility = useSelector((state) => state.post.postVisibility);
  const selectedGroupId = useSelector((state) => state.post.selectedGroup);
  const eventData = useSelector((state) => state.event.eventdata);
  const visibleSnackbar = useSelector((state) => state.event.eventSnackbar);

  const getUser = async () => {
    const email = await SecureStorage.getItemAsync("email");
    getShortProfileInfo(email).then((data) => {
      setUserData(data);
    });
  };

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
    getUser();
  }, [token]);

  const socketConnection = useSelector((state) => state.event.eventSocket);

  useEffect(() => {
    socket.connect();
    if (socket.connected) {
      dispatch({ type: "updateEventSocket", payload: true });
    }

    return () => {
      socket.disconnect();
      if (!socket.connect) {
        dispatch({ type: "updateEventSocket", payload: false });
      }
    };
  }, [socketConnection]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      <Stack.Screen name="Web" component={Web} />
      <Stack.Screen
        name="ViewGroupInfo"
        component={ViewGroupInfo}
        options={{
          headerShown: true,
          headerTitle: "Group info"
        }}
      />
      <Stack.Screen
        name="GroupNewView"
        component={GroupNewView}
        options={{
          headerShown: true,
          headerTitle: "Group info"
        }}
      />
      <Stack.Screen
        name="EventPage"
        component={EventPage}
        options={{
          headerShown: true,
          headerTitle: "Event Page"
        }}
      />
      <Stack.Screen
        name="GroupSettings"
        component={GroupSettings}
        options={{
          headerShown: true,
          headerTitle: "Group Settings"
        }}
      />
      <Stack.Screen
        name="AdminEventPage"
        component={AdminEventPage}
        options={{
          headerShown: true,
          headerTitle: "Your Event"
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
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
                  Create Group
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(postGroupData(groupData));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
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
        name="GenreSelection"
        component={GroupGenreSelection}
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
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Genre</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.goBack();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{
          headerShown: true,
          headerTitle: "Group Details"
        }}
      />
      <Stack.Screen
        name="Post"
        component={ViewPost}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="Events"
        component={EventTopNavigator}
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
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Events</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("CreateEvent");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
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

      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
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
                  Create Event
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const res = dispatch(postEventData(eventData));
                    // console.log(res);
                    // dispatch({
                    //   type: "event/updateSnackbarVisibility",
                    //   payload: true
                    // });
                    // console.log(visibleSnackbar);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("CreateGroup");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
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
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={{
                      uri: userData?.data?.profilePicture
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      borderColor: PRIMARY_COLOR,
                      resizeMode: "cover"
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: "post/updatePostVisibility",
                        payload: !postVisibilityModal
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      {postVisibility.anyone
                        ? "Anyone"
                        : postVisibility.followersOnly
                        ? "Followers only"
                        : "Groups"}
                    </Text>
                    <AntDesign name="caretdown" size={14} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(postData);
                    console.log(selectedGroupId);
                    {
                      postVisibility.anyone
                        ? dispatch(postFormData(postData))
                        : dispatch(
                            postGroupFormData({
                              ...postData,
                              group: selectedGroupId
                            })
                          );
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
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
