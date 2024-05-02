import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { WHITE_COLOR } from "../styles/colors";
import * as SecureStorage from "expo-secure-store";
import { getShortProfileInfo, socket } from "../api/apis";
import { useSelector } from "react-redux";

const EventCommentSection = ({ eventId, eventComments }) => {
  // console.log(eventComments);
  const socketConnection = useSelector((state) => state.event.eventSocket);
  const [allComments, setAllComments] = useState([...eventComments]);

  const [isConnected, setIsConnected] = useState(false);

  const [comment, setComment] = useState("");

  const handleComment = async () => {
    console.log(comment);
    const email = await SecureStorage.getItemAsync("email");
    // socket.on("connect", () => {
    //   socket.emit("postEventComment", eventId, email, comment);
    // });
    if (socket.connected) {
      socket.emit("postEventComment", eventId, email, comment);
    }
  };

  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true);
      socket.emit("joinEvent", eventId);
    }
  }, [socketConnection]);

  // Second useEffect hook for handling new comments
  useEffect(() => {
    if (socket.connected) {
      socket.on("newComment", async ({ email, comment }) => {
        const userData = await getShortProfileInfo(email);
        setAllComments((prevComments) => [
          ...prevComments,
          { user: userData?.data, comment }
        ]);
      });
    }
  }, []); // This runs whenever isConnected changes

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
        marginTop: 10
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        Comments
      </Text>
      <View
        style={{
          backgroundColor: "#eeeeee",
          paddingVertical: 10,
          paddingHorizontal: 10
        }}
      >
        <Text>
          Please keep the comment section respectful and clean to adhere to our
          community guidelines.
        </Text>
      </View>
      <View
        style={{
          // position: "absolute",
          // bottom: 0,
          borderTopColor: "#eeeeee",
          borderTopWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10
          }}
        >
          <Image
            source={{
              uri: "https://picsum.photos/200/300"
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              resizeMode: "cover"
            }}
          />
          <TextInput
            placeholder="Write a comment"
            value={comment}
            style={{
              flex: 1,
              marginLeft: 10,
              borderRadius: 50,
              padding: 10,
              paddingHorizontal: 20,
              borderWidth: 2,
              borderColor: "#eeeeee"
            }}
            onChangeText={(text) => {
              setComment(text);
            }}
            onSubmitEditing={handleComment}
          />
        </View>

        <View
          style={{
            marginTop: 5
          }}
        >
          {[...allComments]?.reverse().map((comment, i) => {
            return (
              <View
                key={i}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  borderBottomColor: "#eeeeee",
                  borderBottomWidth: 1,
                  paddingBottom: 10
                }}
              >
                <Image
                  source={{
                    uri: comment?.user?.profilePicture
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    resizeMode: "cover"
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: "500"
                    }}
                  >
                    {comment?.user?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14
                    }}
                  >
                    {comment.comment}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EventCommentSection;
