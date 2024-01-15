import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GroupCard = ({ groupId, groupImg, groupName, groupFollowers }) => {
  const navigator = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigator.navigate("ViewGroupInfo", {
          groupId: groupId
        })
      }
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
            uri: groupImg
              ? groupImg
              : "https://nurserylive.com/cdn/shop/products/nurserylive-combo-packs-plants-top-5-plants-for-healthy-and-prosperous-new-year-16969394913420.jpg?v=1634230380"
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
          <Text style={{ fontWeight: "500" }}>{groupName}</Text>
          <Text style={{ marginTop: 5 }}>{groupFollowers} members</Text>
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
    </Pressable>
  );
};

export default GroupCard;
