import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";

const sliderWidth = Dimensions.get("window").width;
const imageWidth = Dimensions.get("window").width * 0.72;

const Slider = ({ item, index }) => {
  // console.log(Array.isArray(item));
  // console.log(item[0]);
  return (
    <View style={[styles.shadowView]}>
      <Image
        source={{ uri: item?.urlToImage }}
        style={[styles.imageSlider, {}]}
      />
      {/* <View style={[styles.darkOverlay]} /> */}
      <View style={{ position: "absolute", bottom: 10, left: 20 }}>
        <View>
          {/* <Text>{item?.source?.name}</Text> */}
          <Text style={{ color: "white" }}>
            {new Date(item?.publishedAt).toDateString()}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {item.title.length > 50
            ? item.title.slice(0, 50) + "..."
            : item?.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    width: imageWidth,
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    position: "relative"
  },
  shadowView: {
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3
    elevation:5,
              shadowColor: "#000",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    // height: 200,
    backgroundColor: "#000",
    opacity: 0.5
  }
});

export default Slider;
