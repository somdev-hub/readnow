import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { getProfile, handleFollow } from "../api/apis";
import PostCard from "../components/PostCard";
import * as SecureStorage from "expo-secure-store";

const PeopleProfile = () => {
  const route = useRoute();
  const personData = route.params.item;
  const [followed, setFollowed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const handleFollowFunc = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await handleFollow(email, personData.userEmail);
    console.log(response);
    response.status === 200 && setFollowed(!followed);
  };
  const getProfileInfo = async () => {
    // const email = await SecureStorage.getItemAsync("email");
    getProfile(personData.userEmail).then((response) => {
      // console.log(response.data.userData);
      setUserData(response.data.userData);
      setUserPosts(response.data.postData);
    });
  };

  useEffect(() => {
    getProfileInfo();
    SecureStorage.getItemAsync("email").then((response) => {
      setFollowed(userData?.followers.includes(response));
    });
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
                uri: userData?.backgroundPicture
              }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
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
                  uri: userData?.profilePicture
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 50
                }}
              />
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
                  //   fontWeight: "500",
                  fontSize: 16
                }}
              >
                {userData?.header}
              </Text>
              <Text style={{ marginTop: 10, color: "#00A9FF" }}>
                {userData?.tags}
              </Text>
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
              onPress={() => {
                handleFollowFunc();
              }}
              style={{
                borderColor: "#39A7FF",
                //   borderWidth: followed ? 0 : 1,
                borderWidth: 2,
                marginHorizontal: 20,
                padding: 10,
                borderRadius: 30,
                marginTop: 20,
                //   width: 80,
                backgroundColor: followed ? "#39A7FF" : "white"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: followed ? "white" : "#39A7FF",
                  textAlign: "center",
                  fontWeight: "500"
                }}
              >
                {followed ? "Following" : "Follow"}
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
          <Text style={{ fontWeight: "500", fontSize: 16 }}>About</Text>
          <Text style={{ marginTop: 10, fontSize: 12 }}>
            {userData?.description}
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              Read more...
            </Text>
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
            Posts
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
        <View>
          {userPosts?.map((item, index) => {
            // console.log(item.description.length);
            return (
              <PostCard
                key={index}
                user={userData?.name}
                header={userData?.header}
                description={item.description || ""}
                image={item.image}
                likes={item.likedBy}
                comments={item.comments}
                profilePicture={userData?.profilePicture}
                // optionsContent={optionContents}
                post={item}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "500"
    // fontSize: 18
    // marginLeft: 20
  }
});

export default PeopleProfile;
