import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const GroupCard = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "start",
        marginHorizontal: 10,
        gap: 10
      }}
    >
      <View
        style={{
          backgroundColor: "#A9A9A9",
          height: 55,
          width: 55,
          borderRadius: 10,
          marginTop: 20
        }}
      >
        <Image
          source={{
            uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 10
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          borderBottomColor: "#A9A9A9",
          borderBottomWidth: 1,
          paddingVertical: 17
        }}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ fontWeight: "500" }}>
            React native developer group and react discussion center
          </Text>
          <Text style={{ marginTop: 5 }}>1200 members</Text>
        </View>
        <View>
          <Entypo
            //   onPress={openMenu}
            name="dots-three-vertical"
            size={20}
            color="black"
          />
        </View>
      </View>
    </View>
  );
};

export default GroupCard;
