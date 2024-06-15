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
  getPost,
  getShortProfileInfo
} from "../api/apis";
import GroupPostCard from "../components/GroupPostCard";
import { PRIMARY_COLOR } from "../styles/colors";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";

const ViewPost = () => {
  const route = useRoute();
  const id = route.params.id;
  const type = route.params.type;
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setPostData] = useState({
    user: "",
    header: "",
    profilePicture: "",
    description: "",
    image: "",
    likes: [],
    comments: [],
    id: ""
  });
  const [userComment, setUserComment] = useState("");
  const bookmarkNotification = useSelector(
    (state) => state.notify.addedToBookmark
  );
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);
  const handleComment = async () => {
    if (userComment === "") return;
    setRefreshing(true);
    const email = await SecureStore.getItemAsync("email");
    if (item.type === "group-post") {
      const res = await commentGroupPost(id, email, userComment);
      console.log(res);
    } else {
      const res = await commentPost(id, email, userComment);
      console.log(res);
    }
    setUserComment("");
    item.fetchData();
    setRefreshing(false);
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

  useEffect(() => {
    const fetchPost = async () => {
      console.log(id);
      const response = await getPost(id);
      console.log(response);
      const responseWithProfileInfo = await getShortProfileInfo(
        response?.post?.postedBy
      );

      setPostData({
        ...response.post,
        user: responseWithProfileInfo.data.name,
        profilePicture: responseWithProfileInfo.data.profilePicture,
        header: responseWithProfileInfo.data.header,
        likes: response.post.likedBy
      });
    };

    fetchPost();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ marginBottom: 70 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {postData && (
          <View>
            {type === "group-post" ? (
              <GroupPostCard {...postData} />
            ) : (
              <PostCard {...postData} />
            )}
          </View>
        )}
        <View style={{ marginHorizontal: 10, marginBottom: 5, gap: 10 }}>
          {postData?.comments?.reverse().map((comment, index) => {
            return (
              <CommentCard
                optionsContent={optionsContent}
                key={index}
                comment={comment}
              />
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          elevation: 1,
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          justifyContent: "center",
          padding: 15
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
              source={{
                uri: postData?.profilePicture
                  ? postData?.profilePicture
                  : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              }}
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
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: PRIMARY_COLOR
                }}
              >
                Post
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Snackbar
        visible={bookmarkNotification.addToBookmark}
        style={{ position: "absolute", bottom: 70 }}
        onDismiss={() => {}}
        action={{
          label: "Done",
          onPress: () => {
            dispatch({
              type: "notify/addBookmark",
              payload: {
                addToBookmark: false
              }
            });
          }
        }}
      >
        Added to Bookmarks
      </Snackbar>
    </View>
  );
};

export default ViewPost;
