import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { Animated } from "react-native";

const NewsCard = ({ item, isSelected, setSelectedNews, index }) => {
  const sliderWidth = Dimensions.get("window").width;
  const navigator = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  // console.log(item);
  return (
    <Pressable
      onPress={() => navigator.navigate("Article", { item: item })}
      onLongPress={() => {
        console.log("long pressed");
        setChecked(!checked);
        setSelectedNews((prevSelectedItems) => {
          if (prevSelectedItems.includes(index)) {
            // If the item is already selected, unselect it
            return prevSelectedItems.filter((i) => i !== index);
          } else {
            // If the item is not selected, select it
            return [...prevSelectedItems, index];
          }
        });
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true
        }).start();
      }}
      onPressOut={() => {
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start();
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scale }],
          flexDirection: "row",
          gap: 7,
          flex: 1,
          alignItems: "center",
          paddingHorizontal:  15,
          paddingVertical: isSelected ? 10 : 0,
          backgroundColor: isSelected ? "#DDE6ED" : "transparent"
        }}
      >
        {/* {isSelected && (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              setSelectedNews((prevSelectedItems) => {
                if (prevSelectedItems.includes(index)) {
                  // If the item is already selected, unselect it
                  return prevSelectedItems.filter((i) => i !== index);
                } else {
                  // If the item is not selected, select it
                  return [...prevSelectedItems, index];
                }
              });
            }}
          />
        )} */}
        <Image
          source={{
            uri: item.urlToImage
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
            {item.title.length > 80
              ? item.title.slice(0, 80) + "..."
              : item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 20,
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <Text style={{ color: "#A9A9A9" }}>
              {item.source.name.length > 12
                ? item.source.name.slice(0, 12) + "..."
                : item.source.name}
            </Text>
            <Text style={{ color: "#A9A9A9" }}>
              {new Date(item.publishedAt).toDateString()}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default NewsCard;
