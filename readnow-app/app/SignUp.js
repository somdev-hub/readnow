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
import { ActivityIndicator } from "react-native-paper";


const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });
  const [rePassword, setRePassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const navigator = useNavigation();
  const setFormData = (key, value) => {
    if (key === "rePassword") {
      setMatchPassword(false);
      setRePassword(value);
      if (value === userCredentials.password) {
        setMatchPassword(true);
      }
    } else setUserCredentials({ ...userCredentials, [key]: value });
  };
  const handleSubmit = () => {
    if (userCredentials.password !== rePassword) {
      // alert("Password not match");
      return;
    }
    navigator.navigate("AddInfo", { userCredentials: userCredentials });
    // console.log(userCredentials);
  };
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });
  if (!fontsLoaded) {
    return <ActivityIndicator animating={true} color={"#1640D6"} />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigator.navigate("Login")}
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
              color: "#00A9FF"
            }}
          >
            Log in
          </Text>
          <AntDesign name="arrowright" size={16} color="#00A9FF" />
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
                Your email address
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("email", text)}
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
                onChangeText={(text) => setFormData("password", text)}
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
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Re-Enter password
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("rePassword", text)}
                placeholder="min. 8 character"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
              {!matchPassword && (
                <Text style={{ fontSize: 12, color: "red", margin: 10 }}>
                  Password didn't match
                </Text>
              )}
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

export default SignUp;
