import { View, Text, Image, TextInput, ScrollView } from "react-native";
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
      socket.on("newComment", async ({ email, comment, commentedOn }) => {
        const userData = await getShortProfileInfo(email);
        setAllComments((prevComments) => [
          ...prevComments,
          {
            user: userData?.data,
            comment,
            commentedOn: new Date(commentedOn).toLocaleString()
          }
        ]);
      });
    }
  }, []); // This runs whenever isConnected changes

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
        marginTop: 10,
        flex: 1
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
          borderTopColor: "#eeeeee",
          borderTopWidth: 1,
          flex: 1
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
            multiline
            // textAlignVertical="top"
            placeholder="Write a comment"
            value={comment}
            style={{
              flex: 1,
              marginLeft: 10,
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderWidth: 2,
              borderColor: "#eeeeee"
            }}
            onChangeText={(text) => {
              setComment(text);
            }}
            onSubmitEditing={() => {
              handleComment();
              setComment("");
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView nestedScrollEnabled={true}>
            {[...allComments]?.reverse().map((comment, i) => {
              return (
                <View
                  key={i}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "start",
                    borderBottomColor: "#eeeeee",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    width: "95%",
                    
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
                      resizeMode: "cover",
                      marginTop: 5
                    }}
                  />
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95%",
                      // flex:1,
                      paddingRight: 30
                    }}
                  > */}
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500"
                        }}
                      >
                        {comment?.user?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12
                        }}
                      >
                        {comment?.commentedOn}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14
                      }}
                    >
                      {comment.comment}
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};

export default EventCommentSection;
