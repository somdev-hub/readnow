import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { WHITE_COLOR } from "../styles/colors";

const EditionCard = () => {
  return (
    <View
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
            source={{ uri: "https://picsum.photos/200/300" }}
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
              Taylor Marie
            </Text>
            <Text
              style={{
                fontSize: 13
              }}
            >
              May 7th, 1 hour ago
            </Text>
          </View>
        </View>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </View>
      <View>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
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
          How a India based nanotech firm is changing the world with its
          innovative products and services
        </Text>
        <Text
          style={{
            marginTop: 10
          }}
        >
          Est qui nulla veniam dolore sunt cupidatat. Sunt dolore mollit
          cupidatat excepteur reprehenderit.
        </Text>
        <View
          style={{
            flexDirection: "row",
            // marginVertical: 10,
            marginTop: 15,
            marginBottom: 10,
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
            <AntDesign name="like2" size={22} color="black" />
            <Text>12</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center"
            }}
          >
            <FontAwesome name="comment-o" size={22} color="black" />
            <Text>12</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditionCard;
