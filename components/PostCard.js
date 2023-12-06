import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";
import { addBookmark, likePost } from "../api/apis";
import { Snackbar } from "react-native-paper";

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
  onPressBookmark,
  post,
  optionsContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const email = SecureStorage.getItemAsync("email").then((res) => res);
  // console.log(email);

  const handleLike = async () => {
    const userId = await SecureStorage.getItemAsync("email");
    // console.log(post.id);
    // console.log(userId);
    const response = await likePost(post.id, userId);
    console.log(response);
    setLiked(!liked);
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    console.log(likes);
    // const userId = async () => await SecureStorage.getItemAsync("email");
    // // console.log(userId());
    // const value = userId().then((userId) => {
    //   return userId;
    // });
    // console.log(value);
    if (likes.includes(email)) {
      console.log("true");
      setLiked(true);
    }
  }, []);
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
          {optionsContent?.map((option, index) => {
            return (
              <Menu.Item
                onPress={() => {
                  option.function();
                  closeMenu();
                }}
                title={option.option}
                key={index}
              />
            );
          })}
        </Menu>
      </View>
      <View>
        <Text style={{ marginHorizontal: 15 }}>
          {isExpanded ? description : `${description?.substring(0, 100)}...`}
        </Text>
        {description?.length > 100 && (
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
          <Pressable
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            onPress={handleLike}
          >
            <Feather
              name="heart"
              size={22}
              color={liked ? "#39A7FF" : "#000"}
            />
            <Text
              style={{
                color: liked ? "#39A7FF" : "#000",
                fontSize: 14,
                fontWeight: "400"
              }}
            >
              Like
            </Text>
          </Pressable>
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
      {/* <View style={{ flex: 1 }}>
        <Snackbar
          visible={true}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Undo",
            onPress: () => {
              // Do something
            }
          }}
        >
          Added to Bookmarks
        </Snackbar>
      </View> */}
    </View>
  );
};

export default PostCard;
