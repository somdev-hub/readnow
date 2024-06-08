import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  addBookmark,
  getFeeds,
  getFollowingStories,
  getMyStories,
  getProfile,
  getShortProfileInfo
} from "../api/apis";
import { useDispatch } from "react-redux";
import * as SecureStorage from "expo-secure-store";
import { PRIMARY_COLOR } from "../styles/colors";

const size = Dimensions.get("window");
const Feeds = () => {
  const navigator = useNavigation();
  const [feeds, setFeeds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [myStories, setMyStories] = useState(null);
  const [followingStories, setFollowingStories] = useState([]);

  const onRefresh = React.useCallback(() => {
    fetchData();
    fetchMyStories();
  }, []);

  const addToBookmark = async (feedId) => {
    const userMail = await SecureStorage.getItemAsync("email");
    console.log(feedId);
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

  const fetchData = async () => {
    setRefreshing(true);
    const response = await getFeeds();
    const feedsWithProfile = await Promise.all(
      response?.posts?.map(async (feed) => {
        const profileResponse = await getShortProfileInfo(feed.postedBy);
        return {
          ...feed,
          user: profileResponse?.data.name,
          header: profileResponse?.data.header,
          profilePicture: profileResponse?.data.profilePicture
        };
      })
    );
    setFeeds(feedsWithProfile);
    setRefreshing(false);
  };

  const fetchMyStories = async () => {
    const email = await SecureStorage.getItemAsync("email");
    // if (email) {
    console.log("email");
    const response = await getMyStories(email);

    setMyStories(response?.stories);
    // }
  };

  const fetchFollowingStories = async () => {
    const email = await SecureStorage.getItemAsync("email");
    if (email) {
      const response = await getFollowingStories(email);
      setFollowingStories(response?.stories);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMyStories();
    fetchFollowingStories();
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, position: "relative", marginBottom: 60 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          marginTop: 10
          // paddingHorizontal: 20
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "500", paddingHorizontal: 20 }}
        >
          Stories
        </Text>
        <ScrollView
          horizontal
          style={{ marginTop: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            onPress={() => {
              navigator.navigate("AddStory");
            }}
            style={{ justifyContent: "center", marginLeft: 10 }}
          >
            <View
              style={{
                width: 65,
                height: 65,
                borderRadius: 50,
                borderStyle: "dashed",
                borderColor: PRIMARY_COLOR,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Entypo name="plus" size={24} color={PRIMARY_COLOR} />
            </View>
            <Text
              style={{
                fontWeight: "500",
                marginTop: 2,
                fontSize: 12,
                textAlign: "center"
              }}
            >
              Add Story
            </Text>
          </Pressable>

          {myStories && (
            <Pressable
              onPress={() => {
                navigator.navigate("Story", {
                  stories: myStories,
                  admin: true
                });
              }}
              style={{
                justifyContent: "center",
                marginLeft: 10,
                alignItems: "center"
              }}
            >
              <View style={{ width: 65, height: 65 }}>
                <Image
                  source={{
                    uri: myStories?.stories[0]?.url
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 2
                  }}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={{
                  fontWeight: "500",
                  marginTop: 2,
                  fontSize: 12,
                  textAlign: "center"
                }}
              >
                {myStories?.name?.length > 8
                  ? myStories?.name?.slice(0, 8) + "..."
                  : myStories?.name}
              </Text>
            </Pressable>
          )}

          {followingStories?.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigator.navigate("Story", {
                    stories: item,
                    admin: false
                  });
                }}
                style={{
                  justifyContent: "center",
                  marginLeft: 10,
                  alignItems: "center"
                }}
                key={index}
              >
                <View style={{ width: 65, height: 65 }}>
                  <Image
                    source={{
                      uri: item?.stories[0]?.url
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                      borderColor: PRIMARY_COLOR,
                      borderWidth: 2
                    }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={{
                    fontWeight: "500",
                    marginTop: 2,
                    fontSize: 12,
                    textAlign: "center"
                  }}
                >
                  {item?.name?.length > 8
                    ? item?.name?.slice(0, 8) + "..."
                    : item?.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
        {feeds?.length === 0 && (
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            No Posts found
          </Text>
        )}
        <View style={{ marginTop: 5 }}>
          {feeds?.map((item, index) => {
            const { user, profilePicture, header, ...rest } = item;
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
                onPressBookmark={() => {
                  addToBookmark(rest);
                  console.log(rest);
                }}
                post={rest}
                fetchData={fetchData}
                optionsContent={optionsContent}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Feeds;
