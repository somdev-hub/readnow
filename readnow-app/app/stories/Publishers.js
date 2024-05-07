import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable
} from "react-native";
import React from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

const Publishers = () => {
  const navigator = useNavigation();
  return (
    <ScrollView>
      <Searchbar
        placeholder="Search for publishers"
        style={{
          margin: 10,
          backgroundColor: "#DDE6ED",
          fontSize: 14,
          // borderRadius: 50,
          // elevation: 1
        }}
      />
      <Text
        style={{
          fontSize: 18,
          marginLeft: 10,
          fontWeight: "500",
          marginTop: 5
        }}
      >
        Top publishers
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Pressable
              onPress={() => {
                navigator.navigate("PublisherInfo");
              }}
              style={{
                marginTop: 10,
                width: "100%",
                backgroundColor: WHITE_COLOR,
                elevation: 1,
                borderRadius: 10
              }}
              key={index}
            >
              <View
                style={{
                  width: "100%"
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/200/300" }}
                  style={{
                    width: "100%",
                    height: 100,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                  }}
                />
                <Image
                  source={{ uri: "https://picsum.photos/200/300" }}
                  style={{
                    width: 90,
                    height: 90,
                    position: "absolute",
                    top: 55,
                    left: 20,

                    borderWidth: 2,
                    borderColor: WHITE_COLOR
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: 0,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 50,
                    marginHorizontal: 10
                    // marginTop:10
                  }}
                >
                  <Text
                    style={{
                      color: WHITE_COLOR
                    }}
                  >
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500"
                  }}
                >
                  Nanotech technology news and publishing
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    color: "gray",
                    fontSize: 14,
                    fontWeight: "500"
                  }}
                >
                  Robotics, nanotech and innovation
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                  }}
                >
                  <Image
                    source={{ uri: "https://picsum.photos/200/300" }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: "500"
                      }}
                    >
                      By John Doe
                    </Text>
                    <Text
                      style={{
                        color: "gray"
                      }}
                    >
                      Robotics Engineer | Writer
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: PRIMARY_COLOR
                  }}
                >
                  #tech #nanotech #green #energy #science #nanoscience
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Publishers;
