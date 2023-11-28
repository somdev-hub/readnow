import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  editBackgroundPicture,
  editProfilePicture,
  getProfile,
  submitPost
} from "../api/apis";
import * as SecureStorage from "expo-secure-store";

const MyProfile = () => {
  const navigator = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [userData, setUserData] = useState(null);

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
        // const form = new FormData();
        // form.append("description", "test");
        // form.append("postedBy", "test");
        // form.append("image", {
        //   uri: response.assets[0].uri,
        //   name: "postImage.jpg",
        //   type: "image/jpg"
        // });
        // submitPost(form).then((response) => {
        //   console.log(response);
        // });
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

  useEffect(() => {
    SecureStorage.getItemAsync("email").then((email) => {
      getProfile(email).then((response) => {
        console.log(response);
        setUserData(response.data);
        setProfilePicture(response.data.profilePicture);
        setBackgroundPicture(response.data.backgroundPicture);
      });
    });
    console.log(userData);
  }, []);

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
                <AntDesign name="pluscircle" size={24} color="#39A7FF" />
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
                {userData?.tags.map((item, index) => {
                  return (
                    <Text
                      style={{ marginTop: 10, color: "#00A9FF" }}
                      key={index}
                    >
                      {item + " "}
                    </Text>
                  );
                })}
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.textStyle}>
                  {userData?.followers} followers
                </Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>
                  {userData?.following} following
                </Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>{userData?.posts} posts</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigator.navigate("Add Post")}
              style={{
                backgroundColor: "#39A7FF",
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
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
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
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
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
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
                Videos
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "500"
  }
});

export default MyProfile;
