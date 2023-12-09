import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import { getShortProfileInfo } from "../api/apis";

const CommentCard = ({ optionsContent, comment }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getShortProfileInfo(comment.commentedBy).then((Response) => {
      setUserProfile(Response.data);
      console.log(Response.data);
    });
  }, []);
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: "#fff",
          borderRadius: 50
        }}
      >
        <Image
          source={{ uri: userProfile?.profilePicture }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 50,
            resizeMode: "cover"
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,

            elevation: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text style={{ fontWeight: "500" }}>{userProfile?.name}</Text>
              <Text style={{ color: "#A9A9A9" }}>{userProfile?.header}</Text>
            </View>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Entypo
                  onPress={openMenu}
                  name="dots-three-vertical"
                  size={16}
                  color="black"
                />
              }
            >
              {optionsContent?.map((option, index) => {
                return (
                  <Menu.Item
                    onPress={() => {
                      option.function();
                      closeMenu();
                    }}
                    title={option.option}
                    key={index}
                  />
                );
              })}
            </Menu>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{}}>{comment.comment}</Text>
          </View>
        </View>
        <View style={{ marginTop: 5, marginLeft: 10, flexDirection: "row",gap:15,alignItems:"center" }}>
          <Text style={{ fontWeight: "500", color: "#A9A9A9",fontSize:12 }}>Like</Text>
          <Text style={{ fontWeight: "600",fontSize:12 }}>|</Text>
          <Text style={{ fontWeight: "500", color: "#A9A9A9",fontSize:12 }}>Reply</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
