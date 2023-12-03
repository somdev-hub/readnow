import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NewsCard = (item) => {
  const sliderWidth = Dimensions.get("window").width;
  const navigator = useNavigation();
  return (
    <Pressable
      onPress={() => navigator.navigate("Article", { item: item.item })}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 7,
          alignItems: "center"
        }}
      >
        <Image
          source={{
            uri: item.item.urlToImage
          }}
          height={sliderWidth * 0.3}
          width={sliderWidth * 0.3}
          style={{ borderRadius: 10 }}
        />
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              // marginVertical: 1,
              lineHeight: 20
            }}
          >
            {item.item.title.length > 80
              ? item.item.title.slice(0, 80) + "..."
              : item.item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color: "#A9A9A9" }}>
              {item.item.source.name.length > 12
                ? item.item.source.name.slice(0, 12) + "..."
                : item.item.source.name}
            </Text>
            <Text style={{ color: "#A9A9A9" }}>
              {new Date(item.item.publishedAt).toDateString()}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default NewsCard;
