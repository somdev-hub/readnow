import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStorage from "expo-secure-store";
import { getShortProfileInfo } from "../api/apis";
import { PRIMARY_COLOR, WHITE_COLOR } from "../styles/colors";

const Profile = () => {
  const navigator = useNavigation();
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const options = [
    {
      name: "Your Account",
      items: [
        {
          name: "Account",
          icon: "account-circle",
          route: "AddInfo",
          param: {
            userCredentials: { email: email, isEdit: true }
          }
        },
        {
          name: "Email",
          icon: "email",
          route: "EditEmail",
          param: {
            email: email
          }
        },
        {
          name: "Password",
          icon: "lock",
          route: "ChangePassword",
          param: {
            email: email
          }
        },
        {
          name: "Subscription",
          icon: "subscriptions"
        }
      ]
    },
    {
      name: "Settings",
      items: [
        {
          name: "News Feed",
          icon: "rss-feed",
          route: "NewsFeedSelection",
          param: {
            email: email
          }
        },
        {
          name: "Language",
          icon: "language"
        },
        {
          name: "Country",
          icon: "public"
        }
      ]
    }
  ];

  useEffect(() => {
    SecureStorage.getItemAsync("email").then((email) => {
      setEmail(email);
      getShortProfileInfo(email).then((response) => {
        // console.log(response.data);
        setUserData(response.data);
      });
    });
  }, []);

  return (
    <View>
      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => navigator.navigate("Myprofile")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: PRIMARY_COLOR,
            padding: 16,
            borderRadius: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: WHITE_COLOR,
                justifyContent: "center",
                alignItems: "center",
                borderColor: WHITE_COLOR,
                borderWidth: 1
              }}
            >
              <Image
                source={{
                  uri: userData?.profilePicture
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 50
                }}
              />
            </View>
            <View style={{ gap: 3 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
              >
                {userData?.name}
              </Text>
              <Text style={{ color: WHITE_COLOR }}>{userData?.email}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 25,
              width: 25,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FontAwesome name="angle-right" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {options.map((option, index) => {
          return (
            <View key={index}>
              <Text
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  fontWeight: "bold"
                }}
              >
                {option.name}
              </Text>
              <View
                style={{
                  marginHorizontal: 10,
                  marginTop: 10,
                  gap: 20,
                  backgroundColor: "#DDE6ED",
                  padding: 20,
                  borderRadius: 10
                }}
              >
                {option.items.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigator.navigate(item.route, item.param);
                      }}
                      key={index}
                      style={{
                        borderBottomColor: WHITE_COLOR,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        // paddingHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center"
                        }}
                      >
                        <MaterialIcons
                          name={item.icon}
                          size={24}
                          color="black"
                        />
                        <Text style={{ fontWeight: "400", fontSize: 14 }}>
                          {item.name}
                        </Text>
                      </View>
                      <FontAwesome name="angle-right" size={24} color="black" />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Profile;
