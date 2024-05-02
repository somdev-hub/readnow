import { View, Text, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStorage from "expo-secure-store";
import { PRIMARY_COLOR } from "../styles/colors";
import { TouchableRipple } from "react-native-paper";

const DrawerContent = () => {
  const drawerItems = [
    {
      name: "following",
      icon: "user",
      route: ""
    },
    {
      name: "Groups",
      icon: "team",
      route: "GroupsPage"
    },
    {
      name: "Events",
      icon: "calendar",
      route: "Events"
    },
    {
      name: "Stories",
      icon: "bulb1",
      route: ""
    }
  ];
  const navigator = useNavigation();
  const { height } = Dimensions.get("window");
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 30,
          justifyContent: "space-between",
          flexDirection: "column",
          height: height * 0.9
        }}
      >
        <View>
          {/* <TouchableRipple
            onPress={() => {
              console.log("pressed");
            }}
          > */}
            <View
              style={{
                backgroundColor: PRIMARY_COLOR,
                padding: 15,
                borderRadius: 20,
                flexDirection: "row",
                // gap: 10,
                justifyContent: "space-between",
                alignItems: "center"
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
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#eeeeee"
                  }}
                >
                  <Image />
                </View>
                <View style={{ gap: 5 }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Upgrade Now
                  </Text>
                  <Text style={{ color: "white" }}>Just at Rs. 499/-</Text>
                </View>
              </View>
              <FontAwesome name="angle-right" size={24} color="white" />
            </View>
          {/* </TouchableRipple> */}
          <View style={{ marginTop: 30, gap: 30, marginHorizontal: 10 }}>
            <Pressable
              onPress={() =>
                navigator.navigate("Add Post", { visibility: "anyone" })
              }
              style={{ flexDirection: "row", gap: 10 }}
            >
              <AntDesign name="pluscircle" size={24} color={PRIMARY_COLOR} />
              <Text style={{ color: PRIMARY_COLOR, fontWeight: "bold" }}>
                Create
              </Text>
            </Pressable>
            {drawerItems.map((item, index) => {
              return (
                <TouchableRipple
                  // rippleColor="rgba(0, 0, 0, .32)"
                  key={index}
                  onPress={() => console.log("Pressed")}
                >
                  <Pressable
                    onPress={() => navigator.navigate(item.route)}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                    // key={index}
                  >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <AntDesign name={item.icon} size={24} color="black" />
                      <Text style={{ color: "black", fontWeight: "400" }}>
                        {item.name}
                      </Text>
                    </View>
                    <FontAwesome name="angle-right" size={24} color="black" />
                  </Pressable>
                </TouchableRipple>
              );
            })}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginBottom: 0,
              borderTopColor: "#A9A9A9",
              borderTopWidth: 1,
              paddingTop: 20
            }}
          >
            <Pressable
              onPress={() => {
                SecureStorage.deleteItemAsync("token");
                SecureStorage.deleteItemAsync("email");
                navigator.navigate("Login");
              }}
              style={{ flexDirection: "row", gap: 10 }}
            >
              <AntDesign name="logout" size={24} color="red" />
              <Text style={{ color: "red", fontWeight: "400" }}>Logout</Text>
            </Pressable>
            <FontAwesome name="angle-right" size={22} color="red" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
