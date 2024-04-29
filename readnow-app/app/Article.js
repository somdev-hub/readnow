import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  PanResponder,
  StyleSheet,
  Pressable,
  ScrollView
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Article = () => {
  const animatedHeight = useRef(new Animated.Value(screenHeight / 2)).current;
  const route = useRoute();
  const [articleData, setArticleData] = useState("");
  // console.log(route.params);
  const navigator = useNavigation();

  const storeArticle = (item) => {
    try {
      axios
        .post("http://192.168.33.174:3500/bookmarks", {
          user: "user1",
          bookmarks: item
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: animatedHeight }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.spring(animatedHeight, {
          toValue: screenHeight / 2,
          useNativeDriver: false
        }).start();
      } else {
        Animated.spring(animatedHeight, {
          toValue: screenHeight,
          useNativeDriver: false
        }).start();
      }
    }
  });
  useEffect(() => {
    // console.log(route.params.item.url);
    axios
      .post("http://192.168.33.174:3500/article", {
        url: route.params.item.url
      })
      .then((response) => {
        // console.log(response.data);
        setArticleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View
          style={{
            width: screenWidth,
            height: screenHeight * 0.6,
            position: "relative"
          }}
        >
          <SafeAreaView
            style={{
              width: screenWidth,
              // marginHorizontal: 20,
              paddingHorizontal: 15,
              position: "absolute",
              top: 10,
              zIndex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
            }}
          >
            <Pressable
              style={[styles.icons]}
              onPress={() => navigator.goBack()}
            >
              <AntDesign name="left" size={24} color="white" />
            </Pressable>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[styles.icons]}
                onPress={storeArticle(route.params.item)}
              >
                <Feather name="bookmark" size={24} color="white" />
              </Pressable>
              <View style={[styles.icons]}>
                <Entypo name="dots-three-horizontal" size={24} color="white" />
              </View>
            </View>
          </SafeAreaView>
          <Image
            source={{
              uri: route.params.item.urlToImage
            }}
            style={{ width: "100%", height: "100%" }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 50,
              zIndex: 1,
              paddingHorizontal: 15
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              {route.params.item.title}
            </Text>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
              <Text style={{ color: "white" }}>{route.params.item.author}</Text>
              <Text style={{ color: "white" }}>
                {new Date(route.params.item.publishedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <Animated.View
        style={{
          backgroundColor: "white",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          padding: 15,
          zIndex: 2,
          width: screenWidth,

          position: "absolute",
          bottom: 0,
          height: animatedHeight
        }}
        {...panResponder.panHandlers}
      >
        <ScrollView>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 30,
                backgroundColor: "#eeeeee",
                borderRadius: 50,
                height: 30
              }}
            ></View>
            <Text style={{ fontWeight: "bold" }}>
              {route.params.item.source.name}
            </Text>
          </View>
          <View>
            <Text>{articleData}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Article;
