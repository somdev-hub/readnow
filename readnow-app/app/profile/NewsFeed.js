import { View, Text } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";

const NewsFeed = () => {
  const newsFeedGenres = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "Politics",
    "Music",
    "Movies",
    "Books",
    "Art",
    "Education",
    "Travel",
    "Fashion",
    "Food"
  ];
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginLeft: 20,
          marginTop: 10
        }}
      >
        Select your news feed types
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: 20,
          marginTop: 10
        }}
      >
        {newsFeedGenres.map((genre, index) => (
          <Chip
            key={index}
            style={{
              margin: 5,
              backgroundColor: "#f1f1f1"
            }}
            textStyle={{ color: "black" }}
            mode="outlined"
            onPress={() => console.log("Pressed")}
          >
            {genre}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default NewsFeed;
