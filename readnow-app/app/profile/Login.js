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
import { login } from "../../api/apis";
import * as SecureStorage from "expo-secure-store";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../../styles/colors";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); // [1
  const setFormData = (key, value) => {
    setUserCredentials({ ...userCredentials, [key]: value });
  };
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    message: ""
  });
  const navigator = useNavigation();
  const handleSubmit = () => {
    console.log(userCredentials);
    setLoading(true);
    login(userCredentials).then((Response) => {
      console.log(Response);
      if (Response.status === 200) {
        console.log("token saved");
        SecureStorage.deleteItemAsync("email");
        SecureStorage.setItemAsync(
          "email",
          userCredentials.email.toLowerCase()
        );
        setLoading(false);
        SecureStorage.setItemAsync("token", Response.token).then(() => {
          console.log("token saved");
          navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }]
            })
          );
        });
      } else {
        setLoading(false);
        setSnackbarVisible({
          visible: true,
          message: "Invalid credentials"
        });
      }
    });
  };
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });
  if (!fontsLoaded) {
    return <ActivityIndicator animating={true} color={"#1640D6"} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
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
              color: PRIMARY_COLOR
            }}
          >
            SignUp
          </Text>
          <AntDesign name="arrowright" size={16} color={PRIMARY_COLOR} />
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
                source={require("../../assets/logo-removebg.png")}
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
                inputMode="email"
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
                secureTextEntry={true}
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
              backgroundColor: "#1640D6",
              padding: 15,
              borderRadius: 30,
              marginHorizontal: 20,
              marginTop: 20
            }}
          >
            {loading ? (
              <ActivityIndicator animating={true} color={"white"} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "500"
                }}
              >
                Continue
              </Text>
            )}
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
      <Snackbar
        visible={snackbarVisible.visible}
        onDismiss={() => setSnackbarVisible({ visible: false, message: "" })}
      >
        {snackbarVisible.message}
      </Snackbar>
    </SafeAreaView>
  );
};

export default Login;
