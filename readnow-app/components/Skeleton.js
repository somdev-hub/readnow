import { View, Text, Dimensions } from "react-native";
import React from "react";
const sliderWidth = Dimensions.get("window").width;

const Skeleton = () => {
  return (
    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
      <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#ccc",
            height: sliderWidth * 0.3,
            width: sliderWidth * 0.3
          }}
        />
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              backgroundColor: "#ccc",
              height: 20,
              width: "80%",
              marginBottom: 10,
              borderRadius: 10
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              gap: 20,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                backgroundColor: "#ccc",
                height: 20,
                width: "40%",
                borderRadius: 10
              }}
            />
            <View
              style={{
                backgroundColor: "#ccc",
                height: 20,
                width: "40%",
                borderRadius: 10
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Skeleton;
