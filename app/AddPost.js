import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenHeights = Dimensions.get("window").height;
const AddPost = () => {
  return (
    <View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            //   elevation: 1,
            height: screenHeights * 0.8,
            padding: 10
          }}
        >
          <TextInput
            //   style={{ height: screenHeights * 0.8 }}
            multiline
            textAlignVertical="top"
            placeholder="Enter your thoughts..."
            //   numberOfLines={4}
            style={{ fontSize: 16,height:"100%" }}
          />
        </View>
        {/* <ScrollView> */}
        <View
          style={{
            //   elevation: 1,
            backgroundColor: "white",
            marginTop: 10,
            padding: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
            gap: 10,
            height: screenHeights * 0.1
            //   height: 100
          }}
        >
          <FontAwesome5 name="image" size={24} color="#A9A9A9" />
          <MaterialCommunityIcons name="file-pdf-box" size={24} color="#a9a9a9" />
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddPost;
