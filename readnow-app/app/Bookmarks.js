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
import { deleteBookmark, getBookmarks, getShortProfileInfo } from "../api/apis";
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
  const [selectedNews, setSelectedNews] = useState([]);

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
          _id: feed._id,
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
  const deleteSelectedBookmarks = async () => {
    const userMail = await SecureStorage.getItemAsync("email");
    const newsIds = selectedNews.map((index) => newsBookmarks[index]._id);
    console.log(newsIds);
    const response = await deleteBookmark(newsIds, userMail);
    console.log(response);
    fetchBookmarks();
  };

  const optionsContent = [
    {
      option: "Remove",
      function: async (feedId) => {
        const userMail = await SecureStorage.getItemAsync("email");
        deleteBookmark(feedId, userMail, "post").then((data) => {
          console.log(data);
          fetchBookmarks();
        });
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
                optionsContent={optionsContent}
                post={item}
              />
            );
          })}
        </View>
      )}
      {selectedValue === "News" && (
        <View
          style={{
            paddingVertical: 10
          }}
        >
          {selectedNews.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 10
              }}
            >
              <Pressable
                onPress={() => {
                  setSelectedNews([]);
                }}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Text>{selectedNews.length} selected</Text>
              <Pressable
                onPress={() => {
                  deleteSelectedBookmarks();
                  setSelectedNews([]);
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
          )}
          {newsBookmarks.length === 0 && (
            <Text style={{ textAlign: "center" }}>No bookmarked news</Text>
          )}
          <View style={{ marginTop: 10, gap: 15 }}>
            {newsBookmarks.map((item, index) => {
              const isSelected = selectedNews.includes(index);
              return (
                <NewsCard
                  key={index}
                  index={index}
                  item={item.item}
                  isSelected={isSelected}
                  setSelectedNews={setSelectedNews}
                />
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Bookmarks;
