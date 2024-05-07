import { View, Text, ScrollView } from "react-native";
import React from "react";
import EditionCard from "../../components/EditionCard";
import { Searchbar } from "react-native-paper";

const YourPublishers = () => {
  return (
    <ScrollView
      style={{
        paddingVertical: 10
      }}
    >
      <Searchbar
        placeholder="Search journals"
        style={{
          margin: 10,
          backgroundColor: "#DDE6ED",
          fontSize: 14
        }}
      />
      <Text
        style={{
          fontSize: 18,
          marginLeft: 10,
          fontWeight: "500",
          marginTop: 5
        }}
      >
       From publishers you follow
      </Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return <EditionCard key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default YourPublishers;
