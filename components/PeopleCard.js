import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PeopleCard = ({ image, name, header, tags, background }) => {
  const navigator = useNavigation();
  const [followed, setFollowed] = React.useState(false);
  return (
    <Pressable
      onPress={() => {
        navigator.navigate("PeopleProfile", {
          item: { image, name, header, tags, background }
        });
      }}
      style={{
        backgroundColor: "white",
        elevation: 1,
        // borderWidth: 2,
        // borderColor: "#A9A9A9",
        borderRadius: 20,
        marginTop: 20
      }}
    >
      <View style={{ width: "100%", height: 100, position: "relative" }}>
        <Image
          source={{
            uri: background
          }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        />
        <View
          style={{
            width: 90,
            height: 90,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 50,
            position: "absolute",
            backgroundColor: "#eeeeee",
            bottom: -40,
            left: 20
          }}
        >
          <Image
            source={{
              uri: image
            }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 50
            }}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
        <View
          style={{
            // marginVertical: 10,
            justifyContent: "flex-end",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFollowed(!followed);
            }}
            style={{
              borderColor: "#39A7FF",
              //   borderWidth: followed ? 0 : 1,
              borderWidth: 1,
              marginHorizontal: 5,
              padding: 5,
              borderRadius: 30,
              marginTop: 10,
              width: 80,
              backgroundColor: followed ? "#39A7FF" : "white"
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: followed ? "white" : "#39A7FF",
                textAlign: "center"
              }}
            >
              {followed ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>{name}</Text>
          <Text
            style={{
              marginTop: 1,
              marginBottom: 5,
              color: "#A9A9A9",
              fontWeight: "500"
            }}
          >
            {header}
          </Text>
          <Text style={{ color: "#00A9FF" }}>{tags}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PeopleCard;
