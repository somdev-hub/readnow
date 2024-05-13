import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput
} from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useRoute } from "@react-navigation/native";

const JournalComments = () => {
  const route = useRoute();
  const { journalData } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: WHITE_COLOR,
          padding: 10,
          elevation: 2,
          //   gap:20,
          alignItems: "center"
          // justifyContent: "space-between",
          //   flex:1
          //   width:"100%"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            flex: 1
            // marginRight: 20
          }}
        >
          <Image
            source={{
              uri: "https://picsum.photos/200/300"
            }}
            style={{
              width: 40,
              height: 40
              //   borderRadius: 50
            }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                marginTop: 5
              }}
            >
              <Ionicons name="newspaper-outline" size={20} color="black" />
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 12
                }}
              >
                PUBLISHER
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginTop: 2
              }}
            >
              Nanotech technology news and publishing
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: PRIMARY_COLOR,
            paddingVertical: 8,
            borderRadius: 50,
            paddingHorizontal: 10,
            // flex: 1
            marginLeft: 10
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "500"
            }}
          >
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: journalData?.journalCoverImage
            }}
            style={{
              width: "100%",
              height: 200
              // marginTop: 10
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingHorizontal: 10
            }}
          >
            {journalData?.journalTitle}
          </Text>
          <View
            style={{
              marginVertical: 10,
              paddingVertical: 5,
              borderLeftColor: PRIMARY_COLOR,
              borderLeftWidth: 7,
              paddingHorizontal: 10
            }}
          >
            <Text>{journalData?.journalDescription}</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontWeight: "500"
              }}
            >
              Editor
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  marginTop: 10
                }}
              >
                <Image
                  source={{ uri: journalData?.editorInfo?.profilePicture }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500"
                    }}
                  >
                    {journalData?.editorInfo?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13
                    }}
                  >
                    {journalData?.editorInfo?.header}
                  </Text>
                </View>
              </View>
              <Pressable
                style={{
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center"
                }}
              >
                <Entypo name="plus" size={20} color={PRIMARY_COLOR} />
                <Text
                  style={{
                    color: PRIMARY_COLOR,
                    fontWeight: "500"
                  }}
                >
                  Follow
                </Text>
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              paddingHorizontal: 10,
              color: "gray",
              fontWeight: "500"
            }}
          >
            Published on{" "}
            {new Date(journalData?.journalPublishingDate).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 20
          }}
        >
          <Text style={{ fontWeight: "500" }}>Comments</Text>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "flex-start"
              }}
            >
              <Image
                source={{ uri: "https://picsum.photos/200/300" }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50
                }}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: WHITE_COLOR,
                    elevation: 1,
                    padding: 10,
                    borderRadius: 10,
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "500"
                        }}
                      >
                        Soumya Singh
                      </Text>
                      <Text style={{ color: "grey" }}>Content editor</Text>
                    </View>
                    <Entypo
                      name="dots-three-vertical"
                      size={16}
                      color="black"
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 5
                    }}
                  >
                    Tempor voluptate Lorem esse elit irure velit nisi. Tempor
                    voluptate Lorem esse elit irure velit nisi.
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center"
                      }}
                    >
                      <AntDesign name="like1" size={16} color={PRIMARY_COLOR} />
                      <Text>20</Text>
                    </View>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 12
                      }}
                    >
                      20 minutes ago
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 10, margin: 7 }}>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "grey"
                    }}
                  >
                    Like
                  </Text>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "grey"
                    }}
                  >
                    Reply
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: WHITE_COLOR,
          padding: 20,
          elevation: 2,
          borderTopColor: "#DDE6ED",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <TextInput placeholder="Write a comment" />
        <Pressable>
          <Text
            style={{
              color: PRIMARY_COLOR,
              fontWeight: "500"
            }}
          >
            Post
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JournalComments;
