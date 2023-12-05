import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";
import { addBookmark } from "../api/apis";

const size = Dimensions.get("window");

const PostCard = ({
  user,
  header,
  userImage,
  profilePicture,
  description,
  image,
  likes,
  comments,
  onPressBookmark
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  // const addToBookmark = async () => {
  //   const userMail = await SecureStorage.getItemAsync("email");

  //   addBookmark(
  //     {
  //       user,
  //       header,
  //       userImage,
  //       description,
  //       image,
  //       likes,
  //       comments
  //     },
  //     "post",
  //     userMail
  //   ).then((data) => {
  //     console.log(data);
  //   });
  // };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    // <PaperProvider>
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
              borderRadius: 50
            }}
          >
            <Image
              source={{
                uri: profilePicture
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50
              }}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>{user}</Text>
            <Text style={{ color: "#A9A9A9", marginTop: 2 }}>{header}</Text>
          </View>
        </View>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Entypo
              onPress={openMenu}
              name="dots-three-vertical"
              size={20}
              color="black"
            />
          }
        >
          <Menu.Item onPress={onPressBookmark} title="Add to Bookmark" />
          <Menu.Item onPress={() => {}} title="Add to Story" />
          <Menu.Item onPress={() => {}} title="Repost" />
          {/* <Divider /> */}
          <Menu.Item onPress={() => {}} title="Share" />
          <Menu.Item onPress={() => {}} title="Send" />
        </Menu>
      </View>
      <View>
        <Text style={{ marginHorizontal: 15 }}>
          {isExpanded ? description : `${description.substring(0, 100)}...`}
        </Text>
        {description.length > 100 && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={{ color: "blue", marginHorizontal: 15 }}>
              {isExpanded ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}
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
            <Text>{likes.length} likes</Text>
          </View>
          <View>
            <Text>{comments.length} comments</Text>
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
