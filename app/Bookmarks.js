import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  RefreshControl,
  StatusBar
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getBookmarks, getShortProfileInfo } from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import NewsCard from "../components/NewsCard";
import { Chip } from "react-native-paper";

const Bookmarks = () => {
  const [newsBookmarks, setNewsBookmarks] = useState([]);
  const [postBookmarks, setPostBookmarks] = useState([]);
  const [storyBookmarks, setStoryBookmarks] = useState([]);
  const sliderWidth = Dimensions.get("window").width;
  const navigator = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedValue, setSelectedValue] = useState("News");

  const onRefresh = useCallback(() => {
    fetchBookmarks();
  });

  const fetchBookmarks = async () => {
    setRefreshing(true);
    const userMail = await SecureStorage.getItemAsync("email");
    // console.log(userMail);
    const bookmarks = await getBookmarks(userMail);
    // console.log(bookmarks.bookmarks[0]);
    const news = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "news"
    );
    const posts = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "post"
    );
    const stories = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "story"
    );
    setNewsBookmarks(news);
    const feedsWithProfile = await Promise.all(
      posts.map(async (feed) => {
        const profileResponse = await getShortProfileInfo(feed.item.postedBy);
        return {
          ...feed.item,
          user: profileResponse?.data.name,
          header: profileResponse?.data.header,
          profilePicture: profileResponse?.data.profilePicture
        };
      })
    );
    setPostBookmarks(feedsWithProfile);
    setStoryBookmarks(stories);
    setRefreshing(false);
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <ScrollView
      style={{ position: "relative" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 15,
          alignItems: "center",
          paddingVertical: 10,
          gap: 10,
          backgroundColor: "#fff",
          elevation: 1
        }}
      >
        <Chip
          selected={selectedValue === "News"}
          showSelectedCheck
          style={{
            backgroundColor: "transparent"
          }}
          mode="outlined"
          onPress={() => setSelectedValue("News")}
        >
          News
        </Chip>
        <Chip
          selected={selectedValue === "Posts"}
          showSelectedCheck
          style={{
            backgroundColor: "transparent"
          }}
          mode="outlined"
          onPress={() => setSelectedValue("Posts")}
        >
          Posts
        </Chip>
        <Chip
          selected={selectedValue === "Stories"}
          showSelectedCheck
          style={{
            backgroundColor: "transparent"
          }}
          mode="outlined"
          onPress={() => setSelectedValue("Stories")}
        >
          Stories
        </Chip>
      </View>
      {selectedValue === "Posts" && (
        <View style={{ marginTop: 5 }}>
          {postBookmarks.length === 0 && (
            <Text style={{ textAlign: "center" }}>No bookmarked posts</Text>
          )}
          {postBookmarks.map((item, index) => {
            // const { user, profilePicture, header, ...rest } = item;-
            return (
              <PostCard
                key={index}
                user={item.user}
                header={item.header}
                description={item.description}
                image={item.image}
                likes={item.likedBy}
                comments={item.comments}
                profilePicture={item.profilePicture}
              />
            );
          })}
        </View>
      )}
      {selectedValue === "News" && (
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10
          }}
        >
          {newsBookmarks.length === 0 && (
            <Text style={{ textAlign: "center" }}>No bookmarked news</Text>
          )}
          <View style={{ marginTop: 10, gap: 15 }}>
            {newsBookmarks.map((item, index) => {
              return <NewsCard key={index} item={item.item} />;
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Bookmarks;
