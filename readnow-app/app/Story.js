import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Bar } from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Story = () => {
  const [progress, setProgress] = useState({
    progressTimer: 0,
    progressStory: 0
  });
  const navigator = useNavigation();
  const route = useRoute();
  const [currentStory, setCurrentStory] = useState(0);

  const { stories } = route.params;
  const [currentStoryDateTime, setCurrentStoryDateTime] = useState(
    new Date(stories?.stories[0]?.dateTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress.progressTimer < 1) {
          return {
            progressTimer: oldProgress.progressTimer + 0.01,
            progressStory: oldProgress.progressStory
          };
        } else {
          if (oldProgress.progressStory < stories?.stories.length - 1) {
            setCurrentStory(currentStory + 1);
            setCurrentStoryDateTime(
              stories?.stories[currentStory + 1]?.dateTime
            );
            return {
              progressTimer: 0,
              progressStory: oldProgress.progressStory + 1
            };
          } else {
            clearInterval(timer);
            return {
              progressTimer: 1,
              progressStory: oldProgress.progressStory
            };
          }
        }
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      progress.progressTimer >= 1 &&
      progress.progressStory >= stories?.stories?.length - 1
    ) {
      navigator.goBack();
    }
  }, [progress]);
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View style={{ flexDirection: "row", gap: 2 }}>
        {stories?.stories.map((_, index) => {
          return (
            <Bar
              key={index}
              progress={index === currentStory ? progress.progressTimer : 1}
              width={width / stories?.stories.length}
              height={5}
              color="#39A7FF"
              unfilledColor="#ffffff"
              borderWidth={0}
            />
          );
        })}
      </View>
      <Image
        source={{
          uri: stories?.stories[currentStory]?.url
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
              <Image
                source={{
                  uri: stories?.profilePicture
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 50
                }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: "500", fontSize: 16, color: "white" }}>
                {stories?.name}
              </Text>
              <Text style={{ color: "white", marginTop: 1 }}>
                {new Date(currentStoryDateTime).toLocaleTimeString()}
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
