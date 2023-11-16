import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmarks = () => {
  return (
    <SafeAreaView>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "start",
          marginTop: 20,
          borderBottomWidth: 1,
          paddingBottom: 15,
          borderBottomColor: "#ddd"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18,marginLeft:20 }}>Bookmarks</Text>
      </View> */}
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Bookmarks;
