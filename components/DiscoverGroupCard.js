import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DiscoverGroupCard = () => {
  const screenWidth = Dimensions.get("window").width;
  const navigator = useNavigation();
  return (
    <Pressable
      style={{
        width: screenWidth * 0.43,
        height: 230,
        borderRadius: 20,
        marginBottom: 15,
        backgroundColor: "white",
        elevation: 1
        // borderColor: "#39A7FF",
        // borderWidth: 2
      }}
    >
      <View
        style={{
          backgroundColor: "#A9A9A9",
          height: 80,
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "relative",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={{
            uri: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        />
        <View
          style={{
            width: 90,
            height: 90,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 20,
            position: "absolute",
            backgroundColor: "#eeeeee",
            bottom: -40
            // left: "auto"
          }}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 20
            }}
          />
        </View>
      </View>
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 35
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontWeight: "500"
          }}
        >
          Group Name
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            color: "#A9A9A9"
          }}
        >
          100 Members
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            // backgroundColor: "#39A7FF",
            width: "75%",
            height: 30,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#39A7FF",
            borderWidth: 2
          }}
        >
          <Text
            style={{
              textAlign: "center",
              // marginTop: 5,
              fontWeight: "500",
              color: "#39A7FF"
            }}
          >
            Join
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default DiscoverGroupCard;
