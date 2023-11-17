import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import PeopleCard from "../components/PeopleCard";

const People = () => {
  const people_list = [
    {
      name: "John Doe",
      tags: " #Article #post #tech #something #Article #post #tech #something #Article #post #tech #something",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGCBJXogHldzPpOlxXTtWVCs4SENhwuaVo0BhLZ0k0pAiG2045HPRK6QdA8AghA982ytQ&usqp=CAU",
      background:
        "https://img.freepik.com/premium-photo/it-will-be-okay-quote-xx-background_53876-163328.jpg",
      header: "Writer and reader"
    },
    {
      name: "Johnson Heng",
      tags: " #Article #post #tech #something #Article #post #tech #something #Article #post #tech #something",
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background_23-2148213406.jpg?w=360",
      background:
        "https://w0.peakpx.com/wallpaper/86/747/HD-wallpaper-today-is-your-day-motivational-quotes-pink-background-words-others.jpg",
      header: "Content creator"
    },
    {
      name: "Emily Haris",
      tags: " #Article #post #tech #something #Article #post #tech #something #Article #post #tech #something",
      image:
        "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
      background:
        "https://t4.ftcdn.net/jpg/05/50/47/01/240_F_550470153_5GDV3vNkDuqGlg02t6VKWkw16ldZsUDn.jpg",
      header: "Social media influencer"
    }
  ];
  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "start",
          marginTop: 20,
          borderBottomWidth: 1,
          paddingBottom: 15,
          borderBottomColor: "#ddd"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 20 }}>
          People
        </Text>
      </View> */}
      <ScrollView
        style={{
          paddingTop: 20,
          paddingHorizontal: 20
          // backgroundColor: "white"
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          People you might know
        </Text>
        <View>
          {people_list.map((item, index) => {
            return (
              <PeopleCard
                key={index}
                image={item.image}
                background={item.background}
                header={item.header}
                name={item.name}
                tags={item.tags}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default People;
