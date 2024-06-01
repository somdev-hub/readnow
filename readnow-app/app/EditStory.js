import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../styles/colors";
import { addStory } from "../api/apis";
// import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import * as SecureStorage from "expo-secure-store";

const EditStory = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const { story } = route.params;

  const postStory = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await addStory(email, story?.uri);
    if (response.status === 200) {
      navigator.navigate("HomeScreen");
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative"
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          width: "90%",
          marginHorizontal: 20,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10
        }}
      >
        <View>
          <Feather name="arrow-left" size={24} color="white" />
        </View>
        <Pressable
          onPress={() => {
            postStory();
          }}
          style={{
            backgroundColor: PRIMARY_COLOR,
            padding: 5,
            borderRadius: 50,
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500"
            }}
          >
            Set Story
          </Text>
        </Pressable>
      </View>
      <Image
        source={{ uri: story?.uri }}
        style={{ width: "100%", height: "100%" }}
      />
      {/* <SketchCanvas style={{ flex: 1 }} strokeColor={"red"} strokeWidth={7} /> */}
    </SafeAreaView>
  );
};

export default EditStory;
