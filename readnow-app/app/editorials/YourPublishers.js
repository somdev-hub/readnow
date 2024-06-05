import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import EditionCard from "../../components/EditionCard";
import { Searchbar } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";
import { getShortProfileInfo, getSubscribedJournals } from "../../api/apis";

const YourPublishers = () => {
  const [publisherJournals, setPublisherJournals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchJournals();
  });

  const fetchJournals = async () => {
    setRefreshing(true);
    const email = await SecureStorage.getItemAsync("email");
    const response = await getSubscribedJournals(email);

    const responseWithEditorInfo = await Promise.all(
      response?.map(async (journal) => {
        const editorData = await getShortProfileInfo(
          journal.journalEditorEmail
        );
        return { ...journal, editorInfo: editorData.data };
      })
    );

    setPublisherJournals(responseWithEditorInfo);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
        {publisherJournals?.map((journal, index) => {
          return <EditionCard journal={journal} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default YourPublishers;
