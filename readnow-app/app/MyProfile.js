import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  deletePost,
  editBackgroundPicture,
  editProfilePicture,
  getProfile,
  submitPost
} from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import PostCard from "../components/PostCard";
import { Snackbar } from "react-native-paper";
import { PRIMARY_COLOR } from "../styles/colors";

const MyProfile = () => {
  const navigator = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSnackbar = () => {
    setSnackbarVisible(!snackbarVisible);
  };

  const selectImage = async (setPicture, type) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (!response.canceled) {
      setPicture(response.assets[0].uri);
      if (type === "profile") {
        editProfilePicture({
          image: response.assets[0].uri,
          email: userData.email
        }).then((response) => {
          console.log(response);
        });
      } else {
        editBackgroundPicture({
          image: response.assets[0].uri,
          email: userData.email
        }).then((response) => {
          console.log(response);
        });
      }
    }
  };

  const getProfileInfo = async () => {
    const email = await SecureStorage.getItemAsync("email");
    getProfile(email).then((response) => {
      setUserData(response.data.userData);
      setUserPosts(response.data.postData);
      setProfilePicture(response.data.userData.profilePicture);
      setBackgroundPicture(response.data.userData.backgroundPicture);
    });
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const optionContents = [
    {
      option: "Delete post",
      function: async (postId) => {
        deletePost(postId).then((response) => {
          // console.log(response);
          setSnackbarVisible(true);
          getProfileInfo();
        });
      }
    },
    {
      option: "Edit post",
      function: () => {}
    },
    {
      option: "Share post",
      function: () => {}
    },
    {
      option: "Send",
      function: () => {}
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderBottomColor: "#eeeeee",
            paddingBottom: 20
          }}
        >
          <View style={{ height: 120, position: "relative" }}>
            <Image
              source={{
                uri: backgroundPicture
                  ? backgroundPicture
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVTBm4cJI_qbL4IVksKsxQJGaBBrI0Phfvg&usqp=CAU"
              }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
            <Pressable
              onPress={() => selectImage(setBackgroundPicture, "background")}
              style={{ position: "absolute", bottom: 10, right: 20 }}
            >
              <FontAwesome name="pencil-square" size={24} color="#fff" />
            </Pressable>
            <View
              style={{
                width: 100,
                height: 100,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 50,
                position: "absolute",
                backgroundColor: "#eeeeee",
                bottom: -40,
                left: 20
              }}
            >
              <Image
                source={{
                  uri: profilePicture
                    ? profilePicture
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVTBm4cJI_qbL4IVksKsxQJGaBBrI0Phfvg&usqp=CAU"
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 50
                }}
              />
              <Pressable
                onPress={() => selectImage(setProfilePicture, "profile")}
                style={{ position: "absolute", bottom: 10, left: 75 }}
              >
                <AntDesign name="pluscircle" size={24} color={PRIMARY_COLOR} />
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {userData?.name}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  color: "#A9A9A9",
                  fontSize: 16
                }}
              >
                {userData?.header}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* {userData?.tags.map((item, index) => {
                  return (
                    <Text
                      style={{ marginTop: 10, color: PRIMARY_COLOR }}
                      key={index}
                    >
                      {item + " "}
                    </Text>
                  );
                })} */}
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.textStyle}>
                  {userData?.followers.length} followers
                </Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>
                  {userData?.following.length} following
                </Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>{userData?.posts} posts</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigator.navigate("Add Post")}
              style={{
                backgroundColor: PRIMARY_COLOR,
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 30,
                marginTop: 20
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Add Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Description</Text>
          <Text style={{ marginTop: 10, fontSize: 12 }}>
            {userData?.description}
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              Read more...
            </Text>{" "}
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            // paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white"
          }}
        >
          <Text
            style={{ fontWeight: "500", fontSize: 16, paddingHorizontal: 20 }}
          >
            Your posts
          </Text>
          <ScrollView
            horizontal
            style={{ marginTop: 20, flexDirection: "row", gap: 20 }}
          >
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                marginRight: 10,
                borderRadius: 50,
                borderColor: PRIMARY_COLOR
              }}
            >
              <Text style={{ color: PRIMARY_COLOR, textAlign: "center" }}>
                Posts
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                borderRadius: 50,
                marginRight: 10,
                borderColor: PRIMARY_COLOR
              }}
            >
              <Text style={{ color: PRIMARY_COLOR, textAlign: "center" }}>
                Videos
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                borderRadius: 50,
                borderColor: PRIMARY_COLOR
              }}
            >
              <Text style={{ color: PRIMARY_COLOR, textAlign: "center" }}>
                Videos
              </Text>
            </View>
          </ScrollView>
        </View>
        <View>
          {userPosts?.map((item, index) => {
            // console.log(item.description.length);
            return (
              <PostCard
                key={index}
                user={userData.name}
                header={userData.header}
                description={item.description || ""}
                image={item.image}
                likes={item.likedBy}
                comments={item.comments}
                profilePicture={userData.profilePicture}
                optionsContent={optionContents}
                post={item}
              />
            );
          })}
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {}}
        action={{
          label: "Done",
          onPress: () => {
            setSnackbarVisible(false);
          }
        }}
      >
        Post deleted
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "500"
  }
});

export default MyProfile;
