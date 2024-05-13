import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { WHITE_COLOR } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "react-native-paper";

const EditionCard = ({ journal }) => {
  const navigator = useNavigation();
  const lastUpdated = new Date(journal?.lastUpdated);
  const now = new Date();
  const diffInHours = Math.abs(now - lastUpdated) / 36e5;
  const diffInMinutes = Math.abs(now - lastUpdated) / 60000;

  const menuItems = [
    {
      title: "Edit",
      icon: "pencil",
      onPress: () => {
        navigator.navigate("EditJournal", {
          journalId: journal?.id
        });
      }
    },
    {
      title: "Delete",
      icon: "delete",
      onPress: () => {
        console.log("Delete");
      }
    }
  ];
  return (
    <Pressable
      onPress={() => {
        navigator.navigate("Journal", {
          journalId: journal?.id
        });
      }}
      style={{
        backgroundColor: WHITE_COLOR,
        paddingVertical: 10,
        elevation: 1,
        marginBottom: 15
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5
          }}
        >
          <Image
            source={{ uri: journal?.editorInfo?.profilePicture }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500"
              }}
            >
              {journal?.editorInfo?.name}
            </Text>
            <Text
              style={{
                fontSize: 13
              }}
            >
              {journal?.publisher}
            </Text>
          </View>
        </View>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </View>
      <View>
        <Image
          source={{ uri: journal?.journalCoverImage }}
          style={{
            width: "100%",
            height: 200,
            // borderRadius: 5,
            marginTop: 10
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 10
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500"
          }}
        >
          {journal?.journalTitle}
        </Text>
        <Text
          style={{
            marginTop: 10
          }}
        >
          {journal?.journalDescription}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            marginTop: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",

              marginLeft: 5,
              gap: 30
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center"
              }}
            >
              <AntDesign name="like2" size={20} color="black" />
              <Text>{journal?.journalLikes}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center"
              }}
            >
              <FontAwesome name="comment-o" size={20} color="black" />
              <Text>{journal?.journalComments}</Text>
            </View>
          </View>
          <Text
            style={{
              // marginTop: 10,
              color: "gray",
              fontSize: 12
            }}
          >
            {new Date(journal?.journalPublishingDate).toLocaleDateString()},{" "}
            {diffInHours < 1
              ? `${Math.round(diffInMinutes)} minutes ago`
              : `${diffInHours.toFixed(0)} hours ago`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EditionCard;
