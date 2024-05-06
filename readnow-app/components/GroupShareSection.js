import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  Share
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../styles/colors";
import { Checkbox } from "react-native-paper";
import { getShortProfileInfo, getUserFollowers } from "../api/apis";
import * as SecureStorage from "expo-secure-store";

const GroupShareSection = () => {
  const height = Dimensions.get("window").height;
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  const shareSocialMediaList = [
    {
      name: "Whatsapp",
      icon: "whatsapp",
      url: (message) => `whatsapp://send?text=${encodeURIComponent(message)}`
    },
    {
      name: "Facebook",
      icon: "facebook",
      url: (message) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          message
        )}`
    },
    {
      name: "Twitter",
      icon: "twitter",
      url: (message) =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: () => `https://www.instagram.com/`
    }
  ];

  useEffect(() => {
    const getFollowers = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const response = await getUserFollowers(email);
      //   console.log(response);
      const followersData = await Promise.all(
        response?.followers?.map(async (follower) => {
          const userData = await getShortProfileInfo(follower);
          return userData.data;
        })
      );

      setUserFollowers(followersData);
    };
    getFollowers();
  }, []);

  return (
    <View
      style={{
        // paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10
        }}
      >
        <Text
          style={{
            // fontSize: 16,
            fontWeight: "500"
            // paddingHorizontal:10
          }}
        >
          Invite from your followers list
        </Text>
        <TextInput
          style={{
            backgroundColor: "#DDE6ED",
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginTop: 10
            // marginHorizontal:10
          }}
          placeholder="Search followers"
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          width: "100%"
          // alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#eeeeee",
            paddingHorizontal: 10,
            height: height * 0.59
          }}
        >
          {userFollowers?.map((follower, index) => {
            return (
              <Pressable
                onPress={() => {
                  setSelectedFollowers((prev) => {
                    if (prev.includes(index)) {
                      return prev.filter((item) => item !== index);
                    } else {
                      return [...prev, index];
                    }
                  });
                }}
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  flex: 1
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                      // gap: 0
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50
                      }}
                    >
                      <Image
                        source={{
                          uri: follower.profilePicture
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                          borderRadius: 50
                        }}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        {follower.name}
                      </Text>
                      <Text style={{ color: "#A9A9A9" }}>
                        {follower.header}
                      </Text>
                    </View>
                  </View>

                  <Checkbox
                    status={
                      selectedFollowers.includes(index)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      setSelectedFollowers((prev) => {
                        if (prev.includes(index)) {
                          return prev.filter((item) => item !== index);
                        } else {
                          return [...prev, index];
                        }
                      });
                    }}
                  />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        {selectedFollowers.length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: PRIMARY_COLOR,
              padding: 15,
              borderRadius: 10,
              marginRight: 10,
              position: "absolute",
              bottom: 20,
              width: "90%",
              alignSelf: "center",
              elevation: 2
            }}
          >
            <Text
              style={{
                color: WHITE_COLOR,
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              Invite
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10
        }}
      >
        <Text
          style={{
            // fontSize: 16,
            fontWeight: "500"
          }}
        >
          Or share this group with others
        </Text>
        <ScrollView
          horizontal
          style={{
            marginTop: 10,
            width: "100%"
          }}
        >
          {shareSocialMediaList.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  const message = `Join our group to know more about nanotechnology, here is the invite link: [https://readnow.com/app/join-group/123ere121]`;
                  const url = item.url(message);
                  Linking.canOpenURL(url).then((supported) => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      console.log("Unable to open url");
                    }
                  });
                }}
                style={{
                  backgroundColor: "#DDE6ED",
                  padding: 15,
                  borderRadius: 50,
                  marginRight: 10
                }}
                key={index}
              >
                <FontAwesome5 name={item.icon} size={24} color="black" />
              </Pressable>
            );
          })}
          <Pressable
            onPress={async () => {
              try {
                const result = await Share.share({
                  message: `Join our group to know more about nanotechnology, here is the invite link: [https://readnow.com/app/join-group/123ere121]`
                });

                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
            }}
            style={{
              backgroundColor: "#DDE6ED",
              padding: 15,
              borderRadius: 50,
              marginRight: 10
            }}
          >
            <Entypo name="link" size={24} color="black" />
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default GroupShareSection;
