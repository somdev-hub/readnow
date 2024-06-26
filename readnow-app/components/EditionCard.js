import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { WHITE_COLOR } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { PaperProvider } from "react-native-paper";
import { deleteJournal } from "../api/apis";

const EditionCard = ({ journal, admin }) => {
  const navigator = useNavigation();
  const lastUpdated = new Date(journal?.lastUpdated);
  const now = new Date();
  const diffInHours = Math.abs(now - lastUpdated) / 36e5;
  const diffInMinutes = Math.abs(now - lastUpdated) / 60000;
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      title: "Add chapter",
      icon: "plus",
      onPress: () => {
        setMenuVisible(false);
        navigator.navigate("JournalEditor", {
          journalId: journal?.id
        });
      }
    },
    {
      title: "Edit",
      icon: "pencil",
      onPress: () => {
        navigator.navigate("CreateJournal", {
          journalId: journal?.id,
          isEdit: true
        });
      }
    },
    {
      title: "Delete",
      icon: "delete",
      onPress: async () => {
        const response = await deleteJournal(journal?.id);
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
              {journal?.publisher.length > 40
                ? journal?.publisher.substring(0, 40) + "..."
                : journal?.publisher}
            </Text>
          </View>
        </View>

        {admin && (
          <Menu
            theme={{ colors: { primary: "green" } }}
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Entypo
                name="dots-three-vertical"
                size={20}
                color="black"
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            {menuItems.map((item, index) => {
              return (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    item.onPress();
                    setMenuVisible(false);
                  }}
                  title={item.title}
                  leadingIcon={item.icon}
                />
              );
            })}
          </Menu>
        )}

        {/* <Entypo name="dots-three-vertical" size={20} color="black" /> */}
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
          paddingHorizontal: 15
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
            {new Date(journal?.journalPublishingDate).toLocaleTimeString()}{" "}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EditionCard;
