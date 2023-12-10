import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";

const ManageGroups = () => {
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Groups you manage
          </Text>
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Pressable
              style={{
                backgroundColor: "white",
                elevation: 1,
                borderRadius: 20,
                // marginTop: 15,
                // marginBottom: 5
                marginVertical: 10
              }}
            >
              <View
                style={{ width: "100%", height: 100, position: "relative" }}
              >
                <Image
                  source={{
                    uri: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                  }}
                />
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderColor: "white",
                    borderWidth: 2,
                    borderRadius: 20,
                    position: "absolute",
                    backgroundColor: "#eeeeee",
                    bottom: -40,
                    left: 20
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
              <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                <View
                  style={{
                    // marginVertical: 10,
                    justifyContent: "flex-end",
                    flexDirection: "row"
                  }}
                ></View>
                <View style={{
                    marginTop:30,

                }}>
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    React native developer group and react discussion center
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      color: "#A9A9A9",
                      fontWeight: "500"
                    }}
                  >
                   1200 members
                  </Text>
                  <Text style={{ color: "#00A9FF" }}>
                    #reactnative #react #developer #reactnative #react
                    #developer #reactnative #react #developer
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageGroups;
