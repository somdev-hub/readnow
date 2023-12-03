import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getBookmarks } from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

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
    const stories = bookmarks.bookmarks.filter(
      (bookmark) => bookmark.type === "story"
    );
    setNewsBookmarks(news);
    setPostBookmarks(posts);
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
      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
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
    </ScrollView>
  );
};

export default Bookmarks;
