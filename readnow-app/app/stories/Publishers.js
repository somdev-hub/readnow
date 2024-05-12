import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import PublisherCard from "../../components/PublisherCard";
import { getPublishers, getShortProfileInfo } from "../../api/apis";

const Publishers = () => {
  const navigator = useNavigation();
  const [publisherData, setPublisherData] = useState([]);

  useState(() => {
    const fetchPublishers = async () => {
      const response = await getPublishers();
      const responseWithManagerInfo = await Promise.all(
        response?.publishers?.map(async (publisher) => {
          const managerInfo = await getShortProfileInfo(
            publisher?.publisherManager
          );
          return { ...publisher, managerInfo: managerInfo.data };
        })
      );
      setPublisherData(responseWithManagerInfo);
    };
    fetchPublishers();
  }, []);
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
        {publisherData?.map((publisher, index) => {
          return <PublisherCard key={index} publisher={publisher} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Publishers;
