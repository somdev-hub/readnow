import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import EditionCard from "../../components/EditionCard";

const PublisherInfo = () => {
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start"
          }}
        >
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 5
            }}
          />
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",

                gap: 5,
                alignItems: "center",
                marginTop: 5
              }}
            >
              <Ionicons name="newspaper-outline" size={24} color="black" />
              <Text
                style={{
                  fontWeight: "500"
                }}
              >
                PUBLISHER
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginTop: 5
              }}
            >
              Nanotech technology news and publishing
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 16
          }}
        >
          Ad incididunt eiusmod voluptate dolore tempor ullamco tempor tempor
          laboris anim. Fugiat consectetur labore pariatur excepteur Lorem et
          incididunt tempor consectetur qui dolore do esse ad. Laborum nostrud
          et culpa exercitation aliqua sint sint reprehenderit ut. Lorem commodo
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center"
              // marginTop: 20
            }}
          >
            <Image
              source={{
                uri: "https://picsum.photos/200/300"
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50
                // marginTop: 20
              }}
            />
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16
                }}
              >
                By John Doe
              </Text>
              <Text
                style={{
                  color: "gray"
                }}
              >
                1200 followers
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
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
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              // fontSize: 16
              color: "grey"
            }}
          >
            Robotics, nanotech and innovation | 120,000 subscribers
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            gap: 10,
            width: "100%"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: PRIMARY_COLOR,
              paddingVertical: 8,
              borderRadius: 50,
              flex: 1
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
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              borderRadius: 50,
              flex: 1,
              borderColor: PRIMARY_COLOR,
              borderWidth: 2
            }}
          >
            <Text
              style={{
                color: PRIMARY_COLOR,
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 20
        }}
      >
        <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
          Editions 400
        </Text>
        <View style={{ marginTop: 20 }}>
          {Array.from({ length: 10 }).map((_, index) => {
            return <EditionCard key={index} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default PublisherInfo;
