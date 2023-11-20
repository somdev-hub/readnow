import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const size = Dimensions.get("window");

const PostCard = ({
  user,
  header,
  userImage,
  description,
  image,
  likes,
  comments
}) => {
  return (
    <View
      style={{ backgroundColor: "#ffffff", marginVertical: 10, elevation: 1 }}
    >
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 50,
              backgroundColor: "#eeeeee"
            }}
          >
            <Image />
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>{user}</Text>
            <Text style={{ color: "#A9A9A9", marginTop: 2 }}>{header}</Text>
          </View>
        </View>
        <View>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </View>
      </View>
      <View>
        <Text style={{ marginHorizontal: 15 }}>{description}</Text>
        <Image
          source={{
            uri: image
          }}
          style={{
            width: size.width,
            height: size.height * 0.35,
            marginVertical: 10
          }}
          resizeMode="contain"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
            // marginTop: 20,
            borderBottomColor: "#A9A9A9",
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10
          }}
        >
          <View>
            <Text>{likes} likes</Text>
          </View>
          <View>
            <Text>{comments} comments</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Feather name="heart" size={22} color="#000" />
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "400" }}>
              Like
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="android-messages"
              size={24}
              color="#000"
            />
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "400" }}>
              Comment
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
