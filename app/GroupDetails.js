import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const GroupDetails = () => {
  return (
    <View>
      <ScrollView>
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
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5
            }}
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
                // justifyContent: "center"
              }}
            >
              Show more
            </Text>
            <AntDesign name="down" size={16} color="#39A7FF" style={{}} />
          </TouchableOpacity>
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
            Details
          </Text>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Genra
            </Text>
            <Text>Software Engineering, Computer Science, Web Development</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Location
            </Text>
            <Text>Online</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Visibiliy
            </Text>
            <Text>Public</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Created On
            </Text>
            <Text>Dec 2023</Text>
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
            Rules
          </Text>
          <Text style={{}}>
            Incididunt anim id labore ullamco Lorem dolor veniam. Fugiat aliquip
            commodo excepteur et nostrud cupidatat sint. Magna ullamco non
            excepteur consequat sit sit dolore qui ex mollit in ut pariatur
            voluptate. Sint exercitation sit nulla consequat pariatur. Est et
            quis eiusmod pariatur excepteur aute pariatur consequat pariatur
            dolor reprehenderit amet occaecat. Tempor reprehenderit cupidatat
            cupidatat aute qui id irure quis cupidatat aliqua. Esse est magna
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5
            }}
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
                // justifyContent: "center"
              }}
            >
              Show more
            </Text>
            <AntDesign name="down" size={16} color="#39A7FF" style={{}} />
          </TouchableOpacity>
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
            Members
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginBottom: 10
            }}
          >
            {Array.from(Array(5).keys()).map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    resizeMode: "cover",
                    borderColor: "#39A7FF",
                    borderWidth: 1
                  }}
                />
              );
            })}
            <View
              style={{
                // backgroundColor: "#39A7FF",
                width: 40,
                height: 40,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#39A7FF",
                borderWidth: 2
              }}
            >
              <Text>+1K</Text>
            </View>
          </View>
          <Pressable
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#39A7FF",
                fontWeight: "500"
              }}
            >
              Show all members
            </Text>
            <AntDesign
              name="arrowright"
              size={16}
              color="#39A7FF"
              style={{ textAlign: "center" }}
            />
          </Pressable>
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
            Admins
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  resizeMode: "cover",
                  borderColor: "#39A7FF",
                  borderWidth: 1
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  alignItems: "center",
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 10
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>
                      Rajesh Kumar
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        //   fontSize: 16,
                        backgroundColor: "#DDE6ED",
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        color: "#39A7FF"
                      }}
                    >
                      Owner
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#A9A9A9",
                      fontWeight: "500",
                      fontSize: 14,
                      marginTop: 3
                    }}
                  >
                    Researcher & analyst
                  </Text>
                </View>
                <Pressable>
                  <Text
                    style={{
                      color: "#39A7FF",
                      fontWeight: "500",
                      fontSize: 14,
                      marginTop: 3,
                      marginRight: 10
                    }}
                  >
                    follow
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 50,
                  resizeMode: "cover",
                  borderColor: "#39A7FF",
                  borderWidth: 1
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  alignItems: "center",
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 10
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>
                      Rajesh Kumar
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        //   fontSize: 16,
                        backgroundColor: "#DDE6ED",
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        color: "#39A7FF"
                      }}
                    >
                      Owner
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#A9A9A9",
                      fontWeight: "500",
                      fontSize: 14,
                      marginTop: 3
                    }}
                  >
                    Researcher & analyst
                  </Text>
                </View>
                <Pressable>
                  <Text
                    style={{
                      color: "#39A7FF",
                      fontWeight: "500",
                      fontSize: 14,
                      marginTop: 3,
                      marginRight: 10
                    }}
                  >
                    follow
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupDetails;
