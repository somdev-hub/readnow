import { View, Text } from "react-native";
import React from "react";
import PublisherCard from "../../components/PublisherCard";

const ManagePublisher = () => {
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
        <PublisherCard admin={true} />
      </View>
    </View>
  );
};

export default ManagePublisher;
