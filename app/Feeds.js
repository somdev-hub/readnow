import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostCard from "../components/PostCard";

const size = Dimensions.get("window");
const Feeds = () => {
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
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {posts.map((item, index) => {
          return (
            <PostCard
              key={index}
              user={item.user}
              header={item.header}
              description={item.description}
              image={item.image}
              likes={item.likes}
              comments={item.comments}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Feeds;
