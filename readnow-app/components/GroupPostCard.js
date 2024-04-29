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
import { Menu } from "react-native-paper";
import * as SecureStorage from "expo-secure-store";
import { addBookmark, likeGroupPost, likePost } from "../api/apis";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const size = Dimensions.get("window");

const GroupPostCard = ({
  user,
  header,
  profilePicture,
  groupProfile,
  description,
  image,
  likes,
  comments,
  postId,
  fetchData,
  groupName,
  // optionsContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const email = SecureStorage.getItemAsync("email").then((res) => res);
  const navigator = useNavigation();

  const handleLike = async () => {
    const userId = await SecureStorage.getItemAsync("email");
    const response = await likeGroupPost(postId, userId);
    // console.log(response);
    setLiked(!liked);
  };
  // console.log(post.id);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (likes.includes(email)) {
      // console.log("true");
      setLiked(true);
    }
  }, []);
  const optionsContent = [
    {
      option: "Add to Bookmark",
      function: (feedId) => {
        addToBookmark(feedId);
      }
    },
    {
      option: "Add to Story",
      function: () => {
        console.log("Add to Story");
      }
    },
    {
      option: "Share",
      function: () => {
        console.log("Share");
      }
    },
    {
      option: "Send",
      function: () => {
        console.log("Send");
      }
    },
    {
      option: "Report",
      function: () => {
        console.log("Report");
      }
    }
  ];
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
            alignItems: "center",
            flex: 1
          }}
        >
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 50,
              position: "relative"
            }}
          >
            <Image
              source={{ uri: groupProfile }}
              style={{
                width: "75%",
                height: "75%",
                borderRadius: 10,
                position: "absolute"
              }}
            />
            <Image
              source={{
                uri: profilePicture
              }}
              style={{
                width: "65%",
                height: "65%",
                borderRadius: 50,
                position: "absolute",
                left: "30%",
                bottom: "5%"
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "500", fontSize: 16, flex: 1 }}>
              {groupName.length > 50
                ? `${groupName.substring(0, 50)}...`
                : groupName}
            </Text>
            <Text style={{ color: "#A9A9A9", marginTop: 2 }}>
              {user} | {header}
            </Text>
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
                  option.function(postId);
                  closeMenu();
                }}
                title={option.option}
                key={index}
              />
            );
          })}
        </Menu>
      </View>
      <View style={{flex:1}}>
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
            marginVertical: 10,
            resizeMode: "contain"
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
            borderBottomColor: "#A9A9A9",
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10
          }}
        >
          <View>
            <Text>{likes?.length} likes</Text>
          </View>
          <View>
            <Text>{comments?.length} comments</Text>
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
          <Pressable
            onPress={() => {
              // route.name === "Feed" &&
                navigator.navigate("Post", {
                  item: {
                    user,
                    header,
                    profilePicture,
                    groupProfile,
                    description,
                    image,
                    likes,
                    comments,
                    id: postId,
                    type:"group-post",
                    groupName,
                    optionsContent
                  }
                });
            }}
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="android-messages"
              size={24}
              color="#000"
            />
            <Text style={{ color: "#000", fontSize: 14, fontWeight: "400" }}>
              Comment
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GroupPostCard;
