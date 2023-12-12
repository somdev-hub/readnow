import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable
} from "react-native";
import React from "react";
import { Chip } from "react-native-paper";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ViewGroupInfo = () => {
  const navigator = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
          <View
            style={{
              paddingBottom: 45
            }}
          >
            <View
              style={{
                height: 110,
                backgroundColor: "gray"

                // zIndex: 1
              }}
            >
              <Image
                source={{
                  uri: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                }}
                style={{
                  width: "100%",
                  height: "100%",

                  position: "relative",
                  zIndex: 1
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                  gap: 10
                }}
              >
                <Pressable onPress={() => navigator.navigate("GroupSettings")}>
                  <Feather name="settings" size={22} color="#39A7FF" />
                </Pressable>
                <Feather name="bell" size={22} color="#39A7FF" />
              </View>
              <View
                style={{
                  position: "absolute",
                  // top: 30,
                  left: 20,
                  // right: 10,
                  bottom: -40,
                  backgroundColor: "white",
                  width: 90,
                  height: 90,
                  zIndex: 5,
                  borderRadius: 20,
                  // elevation: 5,
                  borderColor: "#39A7FF",
                  borderWidth: 1
                }}
              >
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
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 20,
                marginTop: 10
              }}
            >
              React Native developer group and react discussion forum
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontWeight: "500",
                fontSize: 16,
                color: "#A9A9A9"
              }}
            >
              1200 followers | 1500+ posts
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                gap: 10,
                flex: 1
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 8,
                  backgroundColor: "#39A7FF",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // marginTop: 5,
                    fontWeight: "500",
                    color: "white"
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderColor: "#39A7FF",
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // marginTop: 5,
                    fontWeight: "500",
                    color: "#39A7FF"
                  }}
                >
                  Invite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#39A7FF",
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color="#39A7FF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginVertical: 10
            }}
          >
            Description
          </Text>
          <Text style={{}}>
            Incididunt anim id labore ullamco Lorem dolor veniam. Fugiat aliquip
            commodo excepteur et nostrud cupidatat sint. Magna ullamco non
            excepteur consequat sit sit dolore qui ex mollit in ut pariatur
            voluptate. Sint exercitation sit nulla consequat pariatur. Est et
            quis eiusmod pariatur excepteur aute pariatur consequat pariatur
            dolor reprehenderit amet occaecat. Tempor reprehenderit cupidatat
            cupidatat aute qui id irure quis cupidatat aliqua. Esse est magna
            pariatur occaecat id ullamco sit qui cupidatat laboris. Est ea
            aliqua consequat fugiat ullamco exercitation cillum laborum ut.
            Officia eu voluptate laboris elit consequat ex magna labore minim
            consequat exercitation consectetur duis sit. Duis consequat commodo
            deserunt nisi id cillum et consequat esse dolor magna. Aliquip
            labore officia qui aute. Sint nostrud proident sunt nulla
            adipisicing deserunt voluptate laboris aliquip. Aliqua aliqua
            laborum ea eu laborum proident aliquip dolore culpa sunt occaecat.
            Minim veniam esse enim qui commodo dolor veniam. Dolor consectetur
            commodo deserunt cillum aliquip deserunt excepteur et. Et
            consectetur reprehenderit veniam labore. Exercitation Lorem
            exercitation quis nisi anim magna anim sunt in et eiusmod. Occaecat
            nisi laboris non Lorem commodo. Anim sint in dolor adipisicing do
            nulla laborum deserunt anim ea ipsum fugiat. Commodo Lorem
            consectetur quis sit.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("GroupDetails");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                color: "#39A7FF",
                fontWeight: "500",
                fontSize: 16
              }}
            >
              More details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 10
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 50
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 50
              }}
            />
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <TextInput
              style={{
                // width: "100%",
                flex: 1,
                height: 40,
                backgroundColor: "#F5F5F5",
                borderRadius: 50,
                paddingHorizontal: 20
              }}
              placeholder="Post something here..."
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              // paddingHorizontal: 15,
              alignItems: "center",
              paddingVertical: 10,
              gap: 10,
              backgroundColor: "#fff",
              elevation: 1
            }}
          >
            <Chip
              // selected={selectedValue === "News"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("News")}
            >
              News
            </Chip>
            <Chip
              // selected={selectedValue === "Posts"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("Posts")}
            >
              Posts
            </Chip>
            <Chip
              // selected={selectedValue === "Stories"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("Stories")}
            >
              Stories
            </Chip>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewGroupInfo;
