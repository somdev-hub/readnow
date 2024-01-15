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
  getProfile,
  getShortProfileInfo
} from "../api/apis";
import { useDispatch } from "react-redux";
import * as SecureStorage from "expo-secure-store";

const size = Dimensions.get("window");
const Feeds = () => {
  const navigator = useNavigation();
  const [feeds, setFeeds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(true);

  const onRefresh = React.useCallback(() => {
    fetchData();
  }, []);

  const posts = [
    {
      user: "John Doe",
      header: "Content writer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus? Quisquam, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus?",
      image:
        "https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?cs=srgb&dl=pexels-brett-sayles-2850290.jpg&fm=jpg",
      likes: 110,
      comments: 30
    },
    {
      user: "John Doe",
      header: "Content writer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus? Quisquam, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus?",
      image:
        "https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?cs=srgb&dl=pexels-brett-sayles-2850290.jpg&fm=jpg",
      likes: 110,
      comments: 30
    },
    {
      user: "John Doe",
      header: "Content writer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus? Quisquam, quod, quae quia voluptates, quibusdam voluptas voluptate doloribus quos officiis natus?",
      image:
        "https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?cs=srgb&dl=pexels-brett-sayles-2850290.jpg&fm=jpg",
      likes: 110,
      comments: 30
    }
  ];
  const stories = [
    {
      user: "John Doe",
      image:
        "https://media.istockphoto.com/id/1392896428/photo/inspirational-quote.jpg?s=612x612&w=0&k=20&c=CbqPLlx65768zd6QQpJqo55MZIAhA_o68cS0nLIfjw0="
    },
    {
      user: "Jessica Jones",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/inspirational-quote-booker-washington-1658173567.png?crop=1xw:1xh;center,top&resize=980:*"
    },
    {
      user: "Mark Smith",
      image:
        "https://i.pinimg.com/736x/44/c5/45/44c545eb4f49d3f81377fe5df7c422fd.jpg"
    },
    {
      user: "Rahul Kumar",
      image:
        "https://img.picturequotes.com/2/112/111846/you-cant-get-a-job-without-experience-and-you-cant-get-experience-until-you-have-a-job-once-you-quote-1.jpg"
    },
    {
      user: "Riya Sharma",
      image:
        "https://images.unsplash.com/photo-1606607291535-b0adfbf7424f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVvdGVzfGVufDB8fDB8fHww"
    },
    {
      user: "Jonny Roi",
      image:
        "https://ih1.redbubble.net/image.2111257042.4771/gbra,8x10,1000x1000-c,0,0,675,900.jpg"
    },
    {
      user: "Alice Lee",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/best-friend-quotes5-1658714864.jpg"
    },
    {
      user: "Bob Marley",
      image:
        "https://i.pinimg.com/736x/24/54/01/2454011963c028872ef467f41257aeb9.jpg"
    }
  ];
  const addToBookmark = async (feedId) => {
    const userMail = await SecureStorage.getItemAsync("email");
    console.log(feedId);
    addBookmark(feedId, "post", userMail).then((data) => {
      console.log(data);
    });
    dispatch({
      type:"notify/addBookmark",
      payload:{
        addToBookmark:true
      }
    })
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
      response.posts.map(async (feed) => {
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
  useEffect(() => {
    fetchData();
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
              navigator.navigate("Story", {
                user: item.user,
                image: item.image
              });
            }}
            style={{ justifyContent: "center", marginLeft: 10 }}
          >
            <View
              style={{
                width: 65,
                height: 65,
                borderRadius: 50,
                borderStyle: "dashed",
                borderColor: "#49755D",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Entypo name="plus" size={24} color="#49755D" />
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

          {stories.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigator.navigate("Story", {
                    user: item.user,
                    image: item.image
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
                      uri: item.image
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                      borderColor: "#49755D",
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
                  {item.user.length > 8
                    ? item.user.slice(0, 8) + "..."
                    : item.user}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
        {feeds.length === 0 && (
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            No Posts found
          </Text>
        )}
        {feeds.map((item, index) => {
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
    </ScrollView>
  );
};

export default Feeds;
