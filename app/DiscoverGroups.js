import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import DiscoverGroupCard from "../components/DiscoverGroupCard";

const DiscoverGroups = () => {
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Discover Groups
          </Text>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {Array.from(Array(5).keys()).map((item, index) => {
              return <DiscoverGroupCard key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverGroups;
