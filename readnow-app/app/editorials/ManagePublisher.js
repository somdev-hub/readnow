import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PublisherCard from "../../components/PublisherCard";
import * as SecureStorage from "expo-secure-store";
import { getManagedPublishers, getShortProfileInfo } from "../../api/apis";

const ManagePublisher = () => {
  const [publisherData, setPublisherData] = useState([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const response = await getManagedPublishers(email);
      if (response && response?.publishers?.length != 0) {
        const responseWithManagerInfo = await Promise.all(
          response?.publishers?.map(async (publisher) => {
            const managerInfo = await getShortProfileInfo(
              publisher?.publisherManager
            );
            return { ...publisher, managerInfo: managerInfo?.data };
          })
        );
        setPublisherData(responseWithManagerInfo);
      } else {
        setPublisherData([]);
      }
    };
    fetchPublishers();
  }, []);
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          margin: 10
        }}
      >
        Publishers that you manage
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10
        }}
      >
        {publisherData?.map((publisher, index) => {
          return (
            <PublisherCard key={index} publisher={publisher} admin={true} />
          );
        })}
        {/* <PublisherCard admin={true} /> */}
      </View>
    </View>
  );
};

export default ManagePublisher;
