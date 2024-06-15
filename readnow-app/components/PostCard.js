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
import { addBookmark, likePost } from "../api/apis";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const size = Dimensions.get("window");

const PostCard = ({
  user,
  header,
  profilePicture,
  description,
  image,
  likes,
  comments,
  id
  // optionsContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const email = SecureStorage.getItemAsync("email").then((res) => res);
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const addToBookmark = async (feedId) => {
    const userMail = await SecureStorage.getItemAsync("email");
    addBookmark(feedId, "post", userMail).then((data) => {
      console.log(data);
    });
    dispatch({
      type: "notify/addBookmark",
      payload: {
        addToBookmark: true
      }
    });
  };

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

  const handleLike = async () => {
    const userId = await SecureStorage.getItemAsync("email");
    const response = await likePost(id, userId);
    setLiked(!liked);
  };
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (likes?.includes(email)) {
      setLiked(true);
    }
  }, []);
  return (
    <View
      style={{ backgroundColor: "#ffffff", marginVertical: 5, elevation: 1 }}
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
                  ? profilePicture
                  : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
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
                  option.function(id);
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
          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              borderColor: "#000",
              borderWidth: 1,
              flex: 1,
              alignSelf: "center",
              borderRadius: 50,
              padding: 7,
              gap: 5,
              paddingHorizontal: 10,
              alignItems: "center"
            }}
          >
            <Text style={{ fontWeight: "500" }}>
              {isExpanded ? "Read Less" : "Read More"}
            </Text>
            <Entypo
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        )}
        {image && (
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
        )}

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
              route.name === "Feed" &&
                navigator.navigate("Post", {
                  id: id,
                  type: "post"
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

export default PostCard;
