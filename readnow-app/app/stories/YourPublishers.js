import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import EditionCard from "../../components/EditionCard";
import { Searchbar } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";
import { getSubscribedJournals } from "../../api/apis";

const YourPublishers = () => {
  const [publisherJournals, setPublisherJournals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJournals = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await getSubscribedJournals(email);
  };

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
