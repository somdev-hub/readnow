import "react-native-gesture-handler";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import NetInfo from "@react-native-community/netinfo";
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
import SignUp from "../../app/profile/SignUp";
import Login from "../../app/profile/Login";
import Story from "../../app/Story";
import AddInfo from "../../app/profile/AddInfo";
import Groups from "../../app/groups/Groups";
import AddPost from "../../app/AddPost";
import MyProfile from "../../app/profile/MyProfile";
import People from "../../app/People";
import PeopleProfile from "../../app/profile/PeopleProfile";
import ArticlePage from "../../app/ArticlePage";
import ViewPost from "../../app/ViewPost";
import Web from "../../app/Web";
import GroupTopNavigator from "./GroupTopNavigator";
import ViewGroupInfo from "../../app/groups/ViewGroupInfo";
import GroupDetails from "../../app/groups/GroupDetails";
import CreateGroup from "../../app/groups/CreateGroup";
import GroupSettings from "../../app/groups/GroupSettings";
import { editGroupData, postGroupData } from "../../redux/groupSlice";
import GroupGenreSelection from "../../app/groups/GroupGenreSelection";
import GroupNewView from "../../app/groups/GroupNewView";
import Events from "../../app/events/Events";
import EventPage from "../../app/events/EventPage";
import { AntDesign } from "@expo/vector-icons";
import CreateEvent from "../../app/events/CreateEvent";
import AdminEventPage from "../../app/events/AdminEventPage";
import { editEventData, postEventData } from "../../redux/eventSlice";
import { PRIMARY_COLOR } from "../../styles/colors";
import EventTopNavigator from "./EventTopNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { CollapsibleScrollView } from "react-navigation-collapsible";
import GroupAdminPage from "../../app/groups/GroupAdminPage";
import ManageGroupAdmins from "../../app/groups/ManageGroupAdmins";
import ManageGroupMembers from "../../app/groups/ManageGroupMembers";
import StoriesTopNavigator from "./StoriesTopNavigator";
import PublisherInfo from "../../app/editorials/PublisherInfo";
import Journal from "../../app/editorials/Journal";
import JournalComments from "../../app/editorials/JournalComments";
import ManagePublisher from "../../app/editorials/ManagePublisher";
import CreatePublisher from "../../app/editorials/CreatePublisher";
import PublisherAdmin from "../../app/editorials/PublisherAdmin";
import CreateJournal from "../../app/editorials/CreateJournal";
import JournalEditor from "../../app/editorials/JournalEditor";
import {
  editPublisherData,
  postPublisherData
} from "../../redux/publisherSlice";
import PublishersAdminOptions from "../../app/editorials/PublishersAdminOptions";
import NotConnected from "../../app/NotConnected";
import ManageEditors from "../../app/editorials/ManageEditors";
import ManageJournals from "../../app/editorials/ManageJournals";
import ManageSubscribers from "../../app/editorials/ManageSubscribers";
import EditEmail from "../../app/profile/EditEmail";
import ChangePassword from "../../app/profile/ChangePassword";
import NewsFeed from "../../app/profile/NewsFeed";
import SelectLanguage from "../../app/profile/SelectLanguage";
import AddStory from "../../app/AddStory";
import AddCameraStory from "../../app/AddCameraStory";
import EditStory from "../../app/EditStory";
import { updateIsLoggedIn } from "../../redux/authSlice";

const Stack = createStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName="Welcome"
//     >
//       <Stack.Screen name="Welcome" component={Welcome} />
//       <Stack.Screen name="Signup" component={SignUp} />
//       <Stack.Screen name="Login" component={Login} />
//     </Stack.Navigator>
//   );
// };

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
  const alertPostVisibilityModal = useSelector(
    (state) => state.post.alertModel
  );
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const postVisibility = useSelector((state) => state.post.postVisibility);
  const selectedGroupId = useSelector((state) => state.post.selectedGroup);
  const eventData = useSelector((state) => state.event.eventdata);
  const visibleSnackbar = useSelector((state) => state.event.eventSnackbar);
  const currentEventId = useSelector((state) => state.event.currentEventId);
  const idEditedEvent = useSelector((state) => state.event.isEditedEvent);
  const idEditedGroup = useSelector((state) => state.group.isEditedGroup);
  const isEditedPublisher = useSelector(
    (state) => state.publisher.isEditedPublisher
  );
  const publisherData = useSelector((state) => state.publisher.publisherData);
  const reRouteToLogin = useSelector((state) => state.auth.reRouteToLogin);
  // console.log("isEditedGroup " + idEditedGroup);
  const getUser = async () => {
    const email = await SecureStorage.getItemAsync("email");
    getShortProfileInfo(email).then((data) => {
      setUserData(data);
    });
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigator?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "NotConnected" }]
          })
        );
      }
      // } else {
      //   const decodeToken = async () => {
      //     const token = await SecureStorage.getItemAsync("token");

      //     if (token) {
      //       setToken(token);
      //       decodeUser(token)
      //         .then((response) => {
      //           console.log(response);
      //           if (response.status != 200) {
      //             SecureStorage.deleteItemAsync("token");
      //             SecureStorage.deleteItemAsync("email");
      //             navigator?.dispatch(
      //               CommonActions.reset({
      //                 index: 0,
      //                 routes: [{ name: "Welcome" }]
      //               })
      //             );
      //           }
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //     } else {
      //       navigator?.dispatch(
      //         CommonActions.reset({
      //           index: 0,
      //           routes: [{ name: "Welcome" }]
      //         })
      //       );
      //     }
      //   };
      //   decodeToken();
      //   getUser();
      // }
    });

    getUser();

    return () => {
      unsubscribe();
    };
  }, [token]);

  useEffect(() => {
    if (reRouteToLogin) {
      dispatch(updateIsLoggedIn(false));
    }
  }, [reRouteToLogin]);

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
      <Stack.Screen name="NotConnected" component={NotConnected} />
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
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Event</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("CreateEvent", {
                      isEdit: true,
                      eventId: currentEventId
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
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
                    console.log("hello");
                    if (idEditedGroup) {
                      dispatch(editGroupData(groupData));
                    } else {
                      dispatch(postGroupData(groupData));
                    }
                    // navigator.navigate("GroupsPage");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    {idEditedGroup ? "Edit" : "Create"}
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
                    navigator.navigate("CreateEvent", {
                      isEdit: false,
                      eventId: null
                    });
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
                    if (idEditedEvent) {
                      const res = dispatch(editEventData(eventData));
                      console.log(eventData.isEventCoverSame);
                    } else {
                      const res = dispatch(postEventData(eventData));
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
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      {/* <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen
        name="EditEmail"
        component={EditEmail}
        options={{
          headerShown: true,
          headerTitle: "Edit Email"
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTitle: "Change Password"
        }}
      />
      <Stack.Screen
        name="NewsFeedSelection"
        component={NewsFeed}
        options={{
          headerShown: true,
          headerTitle: "Select news feed"
        }}
      />
      <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguage}
        options={{
          headerShown: true,
          headerTitle: "Select language"
        }}
      />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen
        name="AddInfo"
        component={AddInfo}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen
        name="AddStory"
        component={AddStory}
        options={{
          headerShown: true,
          headerTitle: "Add Story"
        }}
      />
      <Stack.Screen
        name="AddCameraStory"
        component={AddCameraStory}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditStory"
        component={EditStory}
        options={{
          headerShown: false
        }}
      />
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
                    navigator.navigate("CreateGroup", {
                      edit: false,
                      groupId: null
                    });
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
                    const dispatchPostData = () => {
                      if (postData.description) {
                        const data = postVisibility.anyone
                          ? postData
                          : { ...postData, group: selectedGroupId };
                        const action = postVisibility.anyone
                          ? postFormData
                          : postGroupFormData;
                        dispatch(action(data));
                      } else {
                        dispatch({
                          type: "post/updateAlertModel",
                          payload: {
                            visible: true,
                            title: "Alert",
                            message: "Please write something before posting"
                          }
                        });
                      }
                    };
                    dispatchPostData();
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
      <Stack.Screen
        name="GroupAdminPage"
        component={GroupAdminPage}
        options={{
          headerShown: true,
          headerTitle: "Group Admin"
        }}
      />
      <Stack.Screen
        name="ManageGroupAdmins"
        component={ManageGroupAdmins}
        options={{
          headerShown: true,
          headerTitle: "Group Admin"
        }}
      />
      <Stack.Screen
        name="ManageGroupMembers"
        component={ManageGroupMembers}
        options={{
          headerShown: true,
          headerTitle: "Group Admin"
        }}
      />

      <Stack.Screen
        name="Editorials"
        component={StoriesTopNavigator}
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
                  Editorials
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("ManagePublisher");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    Manage
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Stack.Screen
        name="PublisherInfo"
        component={PublisherInfo}
        options={{
          headerShown: true,
          headerTitle: "Publisher Info"
        }}
      />
      <Stack.Screen
        name="Journal"
        component={Journal}
        options={{
          headerShown: true,
          headerTitle: "Journal"
        }}
      />
      <Stack.Screen
        name="JournalComments"
        component={JournalComments}
        options={{
          headerShown: true,
          headerTitle: "Journal Comments"
        }}
      />
      <Stack.Screen
        name="PublisherAdmin"
        component={PublisherAdmin}
        options={{
          headerShown: true,
          headerTitle: "Publisher admin"
        }}
      />
      <Stack.Screen
        name="CreateJournal"
        component={CreateJournal}
        options={{
          headerShown: true,
          headerTitle: "Create Journal"
        }}
      />
      <Stack.Screen
        name="ManageEditors"
        component={ManageEditors}
        options={{
          headerShown: true,
          headerTitle: "Manage Editors"
        }}
      />
      <Stack.Screen
        name="ManageSubscribers"
        component={ManageSubscribers}
        options={{
          headerShown: true,
          headerTitle: "Manage Subscribers"
        }}
      />
      <Stack.Screen
        name="ManageJournals"
        component={ManageJournals}
        options={{
          headerShown: true,
          headerTitle: "Manage Journals"
        }}
      />
      <Stack.Screen
        name="PublishersAdminOptions"
        component={PublishersAdminOptions}
        options={{
          headerShown: true,
          headerTitle: "Admin Options"
        }}
      />
      <Stack.Screen
        name="JournalEditor"
        component={JournalEditor}
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
                  Journal Editor
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: "journal/updatePublishJournal",
                      payload: true
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PRIMARY_COLOR
                    }}
                  >
                    Publish
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Stack.Screen
        name="ManagePublisher"
        component={ManagePublisher}
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
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Manage</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate("CreatePublisher", {
                      isEdit: false,
                      publisherId: null
                    });
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
        name="CreatePublisher"
        component={CreatePublisher}
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
                  {isEditedPublisher ? "Edit Publisher" : "Create Publisher"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (isEditedPublisher) {
                      dispatch(editPublisherData(publisherData));
                    } else {
                      dispatch(postPublisherData(publisherData));
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
                    {isEditedPublisher ? "Edit" : "Create"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
