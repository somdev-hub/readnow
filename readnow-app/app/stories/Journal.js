import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView
} from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Journel = () => {
  const navigator = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
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
        <View>
          <Image
            source={{
              uri: "https://picsum.photos/200/300"
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
            Ad est est labore voluptate dolore. Irure exercitation mollit labore
            aliqua sunt ullamco.
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
            <Text>
              Sunt laborum laborum ipsum consequat laborum laboris esse in.
              Nulla sunt consectetur cupidatat adipisicing enim in nisi labore
              sit pariatur. Exercitation ipsum adipisicing magna occaecat.
            </Text>
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
                      fontSize: 14,
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
                    Editor | Story writer
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
            Published on 7th May 2024
          </Text>
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: "500",
              marginBottom: 10
            }}
          >
            Chapters
          </Text>
          <View
            style={{
              borderLeftColor: PRIMARY_COLOR,
              borderLeftWidth: 7,
              paddingVertical: 10
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 10
                  }}
                  key={index}
                >
                  <View
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      width: 25,
                      height: 25,
                      borderRadius: 50
                    }}
                  >
                    <Text
                      style={{
                        color: WHITE_COLOR,
                        fontWeight: "500",
                        textAlign: "center"
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{ fontWeight: index === 0 ? "500" : "400", flex: 1 }}
                  >
                    Minim anim deserunt et ut fugiat id non elit ad id.
                  </Text>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 20
            }}
          >
            Aliqua incididunt dolore ad cupidatat veniam duis Lorem in quis.
            Laborum labore laboris in id cupidatat voluptate nisi sunt dolor in.
            Excepteur enim ipsum et nulla ex ea culpa aute proident nulla
            aliquip ad. Ea exercitation sit velit proident commodo aute anim
            pariatur dolore dolore nulla tempor. Excepteur amet incididunt nisi
            do Lorem non id exercitation. Ad incididunt do et culpa anim
            occaecat pariatur ut. Nulla ad ullamco officia laboris mollit
            commodo. Excepteur Lorem ullamco esse enim Lorem tempor voluptate
            labore nostrud. Dolore in tempor et sit Lorem non ipsum do. Commodo
            ad in magna cillum consectetur. Consequat occaecat laboris veniam
            dolore aliqua laboris aliqua esse duis. In in eiusmod anim culpa
            ipsum excepteur consequat ex ipsum pariatur est dolore cillum.
            Ullamco culpa aute pariatur laboris non cupidatat et sit in magna.
            Duis consectetur nostrud officia commodo proident veniam minim Lorem
            ea cillum enim exercitation officia minim. Ullamco exercitation
            reprehenderit aliquip occaecat fugiat commodo est do veniam veniam.
            Ullamco exercitation nisi consectetur Lorem id irure cupidatat
            proident mollit nulla nulla consequat. Veniam cillum veniam sint ut
            nostrud. Quis nulla aliquip nostrud est eiusmod quis officia esse in
            aliquip. Anim cillum labore ipsum consequat. Nulla cupidatat
            exercitation consectetur proident cupidatat eiusmod cupidatat labore
            nostrud laboris nisi. Cillum duis eiusmod nostrud enim non cillum
            aliqua irure dolore dolor incididunt ea deserunt. Magna mollit amet
            laboris deserunt pariatur officia pariatur do esse minim ipsum.
            Tempor esse non adipisicing duis laborum fugiat amet anim
            consectetur. Nisi mollit laborum nostrud excepteur labore occaecat.
            Veniam elit qui veniam et aliqua proident dolor sint proident
            fugiat. Quis enim id deserunt et elit labore aute cillum commodo
            ullamco. Aliquip non duis cillum ad cupidatat.
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: WHITE_COLOR,
          position: "fixed",
          bottom: 0,
          elevation: 5
        }}
      >
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingTop: 10,
            paddingHorizontal: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              //   marginTop: 15,
              marginBottom: 10,
              marginLeft: 5,
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
              <Text>12 comments</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              alignItems: "center"
            }}
          >
            <AntDesign name="like2" size={20} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Like
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigator.navigate("JournalComments");
            }}
            style={{
              alignItems: "center"
            }}
          >
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Comment
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <AntDesign name="sharealt" size={20} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Share
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Journel;
