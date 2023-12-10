import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import GroupCard from "../components/GroupCard";

const Groups = () => {
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Groups you follow
          </Text>
          <View style={{ marginTop: 10 }}>
            {Array.from(Array(5).keys()).map((item, index) => {
              return <GroupCard key={index}/>;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Groups;
