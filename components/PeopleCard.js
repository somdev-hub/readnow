import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { handleFollow } from "../api/apis";
import * as SecureStorage from "expo-secure-store";

const PeopleCard = ({
  image,
  name,
  header,
  tags,
  background,
  userEmail,
  followers
}) => {
  const navigator = useNavigation();
  const [followed, setFollowed] = React.useState(false);
  const handleFollowFunc = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await handleFollow(email, userEmail);
    console.log(response);
    response.status === 200 && setFollowed(!followed);
  };
  useEffect(() => {
    SecureStorage.getItemAsync("email").then((response) => {
      setFollowed(followers.includes(response));
    });
  }, []);
  return (
    <Pressable
      onPress={() => {
        navigator.navigate("PeopleProfile", {
          item: { image, name, header, tags, background, userEmail }
        });
      }}
      style={{
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 20,
        // marginTop: 15,
        // marginBottom: 5
        marginVertical: 10
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
              handleFollowFunc();
            }}
            style={{
              borderColor: "#6C3428",
              //   borderWidth: followed ? 0 : 1,
              borderWidth: 1,
              marginHorizontal: 5,
              padding: 5,
              borderRadius: 30,
              marginTop: 10,
              width: 80,
              backgroundColor: followed ? "#6C3428" : "white"
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: followed ? "white" : "#6C3428",
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
          <Text style={{ color: "#49755D" }}>{tags}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PeopleCard;
