import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  Image,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import * as SecureStore from "expo-secure-store";
import {
  commentGroupPost,
  commentPost,
  getShortProfileInfo
} from "../api/apis";
import GroupPostCard from "../components/GroupPostCard";
import { PRIMARY_COLOR } from "../styles/colors";

const ViewPost = () => {
  const route = useRoute();
  const item = route.params.item;
  const [refreshing, setRefreshing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userComment, setUserComment] = useState("");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // item.fetchData();
    setRefreshing(false);
  }, []);
  const handleComment = async () => {
    if (userComment === "") return;
    setRefreshing(true);
    const email = await SecureStore.getItemAsync("email");
    if (item.type === "group-post") {
      const res = await commentGroupPost(item.id, email, userComment);
      console.log(res);
    } else {
      const res = await commentPost(item.id, email, userComment);
      console.log(res);
    }
    setUserComment("");
    item.fetchData();
    setRefreshing(false);
    // console.log(item.id);
  };
  useEffect(() => {
    const fetchProfilePic = async () => {
      const email = await SecureStore.getItemAsync("email");
      const res = await getShortProfileInfo(email);
      setProfilePic(res.data.profilePicture);
    };
    fetchProfilePic();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ marginBottom: 70 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {item.type === "group-post" ? (
            <GroupPostCard {...item} />
          ) : (
            <PostCard {...item} />
          )}
        </View>
        <View style={{ marginHorizontal: 10, marginBottom: 5, gap: 10 }}>
          {item.comments?.reverse().map((comment, index) => {
            return (
              <CommentCard
                optionsContent={item.optionsContent}
                key={index}
                comment={comment}
              />
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          // height: 70,
          width: "100%",
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          elevation: 1,
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          justifyContent: "center",
          padding: 15
          // paddingHorizontal: 10
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "#eeeeee"
            }}
          >
            <Image
              source={{ uri: profilePic }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 50,
                resizeMode: "cover"
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "85%",
              flex: 1,
              alignItems: "center",
              gap: 5
            }}
          >
            <TextInput
              placeholder="Write your comment..."
              style={{
                fontSize: 14,
                width: "85%",
                flex: 1,
                alignItems: "center",
                flexWrap: "wrap"
              }}
              value={userComment}
              onChangeText={(text) => setUserComment(text)}
              multiline={true}
            />
            <Pressable onPress={handleComment}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: PRIMARY_COLOR }}
              >
                Post
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPost;
