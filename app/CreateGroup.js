import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
// import { Entypo } from '@expo/vector-icons';
import { RadioButton } from "react-native-paper";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const CreateGroup = () => {
  const [checked, setChecked] = React.useState("first");
  return (
    <View style={{ flex: 1 }}>
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
              <View
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
                  // justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <EvilIcons name="pencil" size={28} color="black" />
              </View>
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
                  borderRadius: 20,
                  borderColor: "#39A7FF",
                  borderWidth: 1
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
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
                  <EvilIcons name="pencil" size={28} color="black" />
                </View>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20
          }}
        >
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Enter group name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                //   fontSize: 18,
                // fontWeight: "500",
                marginBottom: 10
              }}
              placeholder="Group Name"
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Enter group description*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                //   fontSize: 18,
                // fontWeight: "500",
                marginBottom: 10
              }}
              placeholder="About this group"
            />
          </View>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Group genre*
            </Text>
            <Pressable
              style={{
                borderColor: "#A9A9A9",
                borderWidth: 1,
                borderRadius: 50,
                // padding: 5,
                paddingVertical: 5,
                paddingHorizontal: 15,
                width: 130,
                flex: 1,

                // width:"auto",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14
                }}
              >
                Add genre
              </Text>
              <Entypo
                name="plus"
                size={18}
                color="black"
                style={{
                  flex: 1
                }}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Enter location*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                //   fontSize: 18,
                // fontWeight: "500",
                marginBottom: 10
              }}
              placeholder="location of your group"
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Enter rules*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                //   fontSize: 18,
                // fontWeight: "500",
                marginBottom: 10
              }}
              placeholder="rules of your group"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#39A7FF"
              }}
            >
              Group visibility*
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                marginRight: 10,
                width: "100%"
              }}
            >
              <View style={{}}>
                <Text style={{ fontWeight: "500" }}>Private</Text>
                <Text
                  style={{
                    marginTop: 5,
                    width: 300
                  }}
                >
                  If set private, only members can see the group posts and
                  people
                </Text>
              </View>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                color="#39A7FF"
                style={{ justifyContent: "center" }}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10
                // width: "100%",
              }}
            >
              <View style={{}}>
                <Text style={{ fontWeight: "500" }}>Public</Text>
                <Text
                  style={{
                    marginTop: 5,
                    width: 300
                    // width:300
                  }}
                >
                  If set public, anyone can see the group posts and people
                </Text>
              </View>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
                color="#39A7FF"
                style={{
                  justifyContent: "center"
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateGroup;
