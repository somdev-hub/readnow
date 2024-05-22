import { View, Text } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

const NotConnected = () => {
  const animation = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View>
        {/* <LottieView
          source={require("../assets/not-connected.json")}
          autoPlay
          ref={animation} // Set ref to control the animation
          loop
          style={{
            width: 200,
            height: 200
          }}
        /> */}
        <Text>Not Connected</Text>
      </View>
    </View>
  );
};

export default NotConnected;
