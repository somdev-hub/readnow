import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Events = () => {
  const navigator = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TextInput
          style={{
            height: 40,
            // borderColor: "gray",
            backgroundColor: "#E5E5E5",
            // borderWidth: 1
            // paddingHorizontal: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10
          }}
          placeholder="Search Events"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500"
              // }}>Upcoming events</Text>
            }}
          >
            Your events
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "#49755D"
              //   }}>View all</Text>
            }}
          >
            View all
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 20
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500"
              // }}>Upcoming events</Text>
            }}
          >
            Top events
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "#49755D"
              //   }}>View all</Text>
            }}
          >
            View all
          </Text>
        </View>
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Pressable
              onPress={() => navigator.navigate("EventPage")}
              key={i}
              style={{
                marginHorizontal: 10,
                gap: 10,
                marginVertical: 8
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10
                }}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/200/300"
                  }}
                  style={{
                    width: 100,
                    height: 80,
                    borderRadius: 10,
                    resizeMode: "cover"
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text>Thu, 21 Dec, 23, 4:00pm</Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginVertical: 3
                    }}
                  >
                    Workshop on plant healthcare and nutrition
                  </Text>
                  <Text>Dr. Pradeep Singh</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Events;
