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

const Bookmarks = () => {
  const [newsBookmarks, setNewsBookmarks] = useState([]);
  const [postBookmarks, setPostBookmarks] = useState([]);
  const [storyBookmarks, setStoryBookmarks] = useState([]);
  const sliderWidth = Dimensions.get("window").width;
  const navigator = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchBookmarks();
  });

  const fetchBookmarks = async () => {
    setRefreshing(true);
    const userMail = await SecureStorage.getItemAsync("email");
    console.log(userMail);
    const bookmarks = await getBookmarks(userMail);
    console.log(bookmarks.bookmarks[0]);
    const news = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "news"
    );
    const posts = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "post"
    );
    console.log(posts[0].item.description);
    const stories = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "story"
    );
    setNewsBookmarks(news);
    const feedsWithProfile = await Promise.all(
      posts.map(async (feed) => {
        const profileResponse = await getShortProfileInfo(feed.item.postedBy);
        // setRefreshing(false);
        return {
          ...feed.item,
          user: profileResponse?.data.name,
          header: profileResponse?.data.header,
          profilePicture: profileResponse?.data.profilePicture
        };
      })
    );
    // console.log(feedsWithProfile);
    setPostBookmarks(feedsWithProfile);
    setStoryBookmarks(stories);
    setRefreshing(false);
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={"transparent"}
      /> */}
      <View
        style={{
          // marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: "#fff"
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>News</Text>
        <View style={{ marginTop: 20, gap: 15 }}>
          {newsBookmarks.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  navigator.navigate("Article", { item: item.item })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 7,
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={{
                      uri: item.item.urlToImage
                    }}
                    height={sliderWidth * 0.3}
                    width={sliderWidth * 0.3}
                    style={{ borderRadius: 10 }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        // marginVertical: 1,
                        lineHeight: 20
                      }}
                    >
                      {item.item.title.length > 80
                        ? item.item.title.slice(0, 80) + "..."
                        : item.item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        gap: 20,
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={{ color: "#A9A9A9" }}>
                        {item.item.source.name.length > 12
                          ? item.item.source.name.slice(0, 12) + "..."
                          : item.item.source.name}
                      </Text>
                      <Text style={{ color: "#A9A9A9" }}>
                        {new Date(item.item.publishedAt).toDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={{ marginTop: 20, backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 20,
            marginTop: 10
            // borderBottomColor:"black",
          }}
        >
          Posts
        </Text>
        <View style={{ marginTop: 10, gap: 15 }}>
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
                // onPressBookmark={() => {
                //   addToBookmark(rest);
                //   console.log(rest);
                // }}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Bookmarks;
