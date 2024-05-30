import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";

const EditEmail = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500"
        }}
      >
        Your Emails
      </Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: WHITE_COLOR,
            borderRadius: 20,
            elevation: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              //   fontSize: 16,
              fontWeight: "500"
            }}
          >
            jason123@gmail.com
          </Text>
          <View
            style={{
              backgroundColor: "red",
              opacity: 0.3,
              padding: 2,
              borderRadius: 50
            }}
          >
            <Entypo name="minus" size={24} color="black" />
          </View>
        </View>
      </View>
      <Pressable style={{}}>
        <Text
          style={{
            marginTop: 20,
            color: PRIMARY_COLOR,
            fontWeight: "500",
            textAlign: "center"
          }}
        >
          Add Email
        </Text>
      </Pressable>
    </View>
  );
};

export default EditEmail;
