import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput
} from "react-native";
import React from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const CreatePublisher = () => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView>
        <View style={{ paddingBottom: 20 }}>
          <View
            style={{
              paddingBottom: 45
            }}
          >
            <View
              style={{
                height: 110,
                backgroundColor: "gray"
              }}
            >
              <Pressable
                // onPress={() => {
                //   selectImage("groupCoverImage");
                // }}
                style={{
                  position: "absolute",
                  backgroundColor: PRIMARY_COLOR,
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
                <EvilIcons name="pencil" size={28} color="white" />
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
              <View
                style={{
                  position: "absolute",
                  left: 20,
                  bottom: -40,
                  backgroundColor: "white",
                  width: 90,
                  height: 90,
                  zIndex: 5,
                  borderRadius: 0,
                  borderColor: WHITE_COLOR,
                  borderWidth: 2
                }}
              >
                <Pressable
                  //   onPress={() => {
                  //     selectImage("groupImage");
                  //   }}
                  style={{
                    position: "absolute",
                    backgroundColor: PRIMARY_COLOR,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    elevation: 1,
                    zIndex: 1,
                    bottom: -10,
                    right: -10,
                    // justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <EvilIcons name="pencil" size={28} color="white" />
                </Pressable>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover"
                    // borderRadius: 20
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Enter publisher name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Select publisher category*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Select publisher tags*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Enter editors emails*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Enter publisher socials
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                flex: 1
              }}
            >
              <Picker
                style={{
                  // backgroundColor: "white",
                  borderColor: "black",
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  flex: 1,
                  fontSize: 14
                }}
              >
                <Picker.Item label="Select" value="Select" />
              </Picker>

              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10,
                  flex: 1
                }}
                placeholder="Publisher Name"
              />
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Enter publisher description*
            </Text>
            <TextInput
              multiline
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatePublisher;
