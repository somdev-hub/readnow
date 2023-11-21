import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../api/apis";
import * as SecureStorage from "expo-secure-store";
// import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });
  const setFormData = (key, value) => {
    setUserCredentials({ ...userCredentials, [key]: value });
  };
  const navigator = useNavigation();
  const handleSubmit = () => {
    console.log(userCredentials);
    login(userCredentials)
      .then((Response) => {
        console.log(Response);
        if (Response.status === 200) {
          console.log("token saved");
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });
  // const navigator = useNavigation();
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigator.navigate("Signup")}
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 5
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontFamily: "Montserrat_600SemiBold",
              color: "#39A7FF"
            }}
          >
            SignUp
          </Text>
          <AntDesign name="arrowright" size={16} color="#39A7FF" />
        </TouchableOpacity>
        <View style={{ marginTop: 10, justifyContent: "center" }}>
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
          <View style={{ marginTop: 50, marginHorizontal: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter your email
              </Text>
              <TextInput
                onChangeText={(value) => setFormData("email", value)}
                placeholder="something@gmail.com"
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
                Enter password
              </Text>
              <TextInput
                onChangeText={(value) => setFormData("password", value)}
                placeholder="min. 8 character"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#39A7FF",
              padding: 15,
              borderRadius: 30,
              marginHorizontal: 20,
              marginTop: 20
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Continue
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderTopColor: "#eeeeee",
              borderWidth: 1,
              marginHorizontal: 50,
              // width: "80%",
              marginTop: 40,
              position: "relative"
            }}
          ></View>
          <Text
            style={{
              marginTop: 10,
              fontWeight: "500",
              textAlign: "center"
            }}
          >
            or
          </Text>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              gap: 30,
              marginTop: 20
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#A9A9A9",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={{
                  uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                }}
                style={{ width: "90%", height: "90%", borderRadius: 50 }}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#A9A9A9",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={{
                  uri: "https://www.freepnglogos.com/uploads/aqua-blue-f-facebook-logo-png-22.png"
                }}
                style={{ width: "90%", height: "90%", borderRadius: 50 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
