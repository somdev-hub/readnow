import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { editProfile, signup } from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../styles/colors";

const AddInfo = () => {
  const route = useRoute();
  const { userCredentials } = route.params;
  const [userData, setUserData] = useState({
    email: userCredentials.email,
    name: "",
    header: "",
    tags: [],
    description: ""
  });
  const setFormData = (key, value) => {
    if (key === "tags") {
      value = value.split(",");
    }
    setUserData({ ...userData, [key]: value });
  };
  const navigator = useNavigation();
  const handleSubmit = () => {
    console.log(userData);
    signup(userCredentials)
      .then((Response) => {
        console.log(Response);
        editProfile(userData).then((response) => {
          console.log(response);
          if (Response.status === 200 && response.status === 200) {
            SecureStorage.deleteItemAsync("email");
            SecureStorage.setItemAsync("email", userCredentials.email);
            SecureStorage.setItemAsync("token", Response.token).then(() => {
              console.log("token saved");
              navigator.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "HomeScreen" }]
                })
              );
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../assets/logo-removebg.png")}
              style={{ width: 70, height: 70 }}
            />
            <Text
              style={{
                fontSize: 18,
                // fontWeight: "bold",
                fontFamily: "Montserrat_600SemiBold"
              }}
            >
              Read Now
            </Text>
          </View>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "500",
              fontFamily: "Montserrat_500Medium"
            }}
          >
            Read unlimited nonstop
          </Text>
        </View>
        {/* <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Some more details
        </Text>
      </View> */}
        <View style={{ marginTop: 10, justifyContent: "center" }}>
          <View style={{ marginTop: 30, marginHorizontal: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter your name
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("name", text)}
                placeholder="John Doe"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter a header
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("header", text)}
                placeholder="Story writer"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter tags
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("tags", text)}
                placeholder="#writer #story #fiction"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                A short description
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("description", text)}
                multiline
                numberOfLines={5}
                placeholder="Write a short description about yourself"
                textAlignVertical="top"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 20,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 20
                  // height: 100,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: PRIMARY_COLOR,
              padding: 15,
              borderRadius: 30,
              marginHorizontal: 20,
              marginTop: 20
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddInfo;
