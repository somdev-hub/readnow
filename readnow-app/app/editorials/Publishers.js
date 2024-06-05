import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import PublisherCard from "../../components/PublisherCard";
import {
  getPublishers,
  getShortProfileInfo,
  searchPublishers
} from "../../api/apis";
import { Snackbar } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";

const Publishers = () => {
  const navigator = useNavigation();
  const [publisherData, setPublisherData] = useState([]);
  const [searchedPublisher, setSearchedPublisher] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSubscribed, setHasSubscribed] = useState({
    visible: false,
    message: ""
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchPublishers();
  });

  const fetchPublishers = async () => {
    setRefreshing(true);
    const email = await SecureStorage.getItemAsync("email");
    const response = await getPublishers(email);
    const responseWithManagerInfo = await Promise.all(
      response?.publishers?.map(async (publisher) => {
        const managerInfo = await getShortProfileInfo(
          publisher?.publisherManager
        );
        return { ...publisher, managerInfo: managerInfo.data };
      })
    );
    setPublisherData(responseWithManagerInfo);
    setRefreshing(false);
  };
  useState(() => {
    fetchPublishers();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchQuery) {
        const email = await SecureStorage.getItemAsync("email");
        const response = await searchPublishers(searchQuery, email);
        const responseWithManagerInfo = await Promise.all(
          response?.publishers?.map(async (publisher) => {
            const managerInfo = await getShortProfileInfo(
              publisher?.publisherManager
            );
            return { ...publisher, managerInfo: managerInfo.data };
          })
        );
        setSearchedPublisher(responseWithManagerInfo);
      } else {
        setSearchedPublisher([]);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ScrollView>
        <Searchbar
          placeholder="Search for publishers"
          style={{
            marginTop: 20,
            margin: 10,
            backgroundColor: "#DDE6ED",
            fontSize: 14
          }}
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        {searchedPublisher.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 10,
                fontWeight: "500",
                marginTop: 5
              }}
            >
              Search results
            </Text>
            <View
              style={{
                paddingHorizontal: 10,
                marginTop: 10
              }}
            >
              {searchedPublisher?.map((publisher, index) => {
                return (
                  <PublisherCard
                    key={index}
                    publisher={publisher}
                    hasSubscribed={hasSubscribed}
                    setHasSubscribed={setHasSubscribed}
                  />
                );
              })}
            </View>
          </View>
        )}
        {searchedPublisher?.length === 0 && (
          <View>
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
              {publisherData?.map((publisher, index) => {
                return (
                  <PublisherCard
                    key={index}
                    publisher={publisher}
                    hasSubscribed={hasSubscribed}
                    setHasSubscribed={setHasSubscribed}
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
      <Snackbar
        visible={hasSubscribed.visible}
        onDismiss={() => setHasSubscribed({ visible: false, message: "" })}
        action={{
          label: "Dismiss",
          onPress: () => {
            setHasSubscribed({ visible: false, message: "" });
          }
        }}
      >
        {hasSubscribed.message}
      </Snackbar>
    </ScrollView>
  );
};

export default Publishers;
