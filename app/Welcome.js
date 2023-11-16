import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");
const Welcome = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#39A7FF",
          height: height * 0.5,
          borderBottomRightRadius: 100,
          borderBottomLeftRadius: 100,
          position: "relative",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: "-12%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            elevation: 3
            // left: "50%",
            // right: "50%",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            // width={10}
            // height={10}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
              resizeMode: "contain"
            }}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          height: height * 0.5
        }}
      >
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}
          >
            ReadNow
          </Text>
          <Text style={{ marginTop: 10 }}>
            Never get tired reading your Favorite news
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigator.navigate("Signup")}
          style={{
            backgroundColor: "#39A7FF",
            padding: 20,
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            elevation: 3,
            flexDirection: "row",
            gap: 10,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>
            Get Started for free
          </Text>
          <FontAwesome name="angle-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
