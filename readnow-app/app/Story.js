import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
// import { ProgressView } from "@react-native-community/progress-view";
import { Bar } from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Story = () => {
  const [progress, setProgress] = useState(0);
  const navigator = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 1) {
          return oldProgress + 0.01; // Increase progress by 1% every 100ms
        } else {
          clearInterval(timer);
          return 1;
        }
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      navigator.goBack();
    }
  }, [progress]);
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Bar
        progress={progress}
        width={width}
        height={5}
        color="#39A7FF"
        unfilledColor="#ffffff"
        borderWidth={0}
      />
      <Image
        source={{
          uri: route.params.image
        }}
        height={height}
        width={width}
        resizeMode="cover"
      />
      <View style={{ position: "absolute", top: 50, left: 20 }}>
        <View
          style={{
            // marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            // paddingVertical: 10,
            width: width - 40,
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                backgroundColor: "#eeeeee"
              }}
            >
              <Image />
            </View>
            <View>
              <Text style={{ fontWeight: "500", fontSize: 16, color: "white" }}>
                {route.params.user}
              </Text>
              <Text style={{ color: "white", marginTop: 1 }}>
                23 minutes ago
              </Text>
            </View>
          </View>
          <View>
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Story;
