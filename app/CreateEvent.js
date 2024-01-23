import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const CreateEvent = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingBottom: 10 }}>
          <View
            style={{
              paddingBottom: 20
            }}
          >
            <View
              style={{
                height: 200,
                backgroundColor: "gray"
              }}
            >
              <Pressable
                onPress={() => {
                  selectImage("groupCoverImage");
                }}
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  elevation: 1,
                  zIndex: 1,
                  bottom: 10,
                  right: 10,
                  alignItems: "center"
                }}
              >
                <EvilIcons name="pencil" size={28} color="black" />
              </Pressable>
              <Image
                source={{
                  uri: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                }}
                style={{
                  width: "100%",
                  height: "100%",

                  position: "relative",
                  zIndex: 0
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <View>
            <Text
              style={{
                // fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Organizer*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Organizer name"
            />
          </View>
          <View>
            <Text
              style={{
                // fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Organizer name"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;
