import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable
} from "react-native";
import React from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import PublisherCard from "../../components/PublisherCard";

const Publishers = () => {
  const navigator = useNavigation();
  return (
    <ScrollView>
      <Searchbar
        placeholder="Search for publishers"
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
        Top publishers
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return <PublisherCard key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Publishers;
