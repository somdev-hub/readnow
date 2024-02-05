import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllEventShortInfo, getShortProfileInfo } from "../api/apis";
import * as SecureStorage from "expo-secure-store";

const Events = () => {
  const navigator = useNavigation();
  const [allEventsData, setAllEventsData] = useState([]);
  const [yourEventsData, setYourEventsData] = useState([]);

  const getAllEventsDetails = async () => {
    const response = await getAllEventShortInfo();
    console.log(response);

    const eventsWithOrganizerNames = await Promise.all(
      response.map(async (event) => {
        const organizerProfile = await getShortProfileInfo(
          event.eventOrganizer
        );
        return {
          ...event,
          eventOrganizerName: organizerProfile?.data?.name // assuming the name is stored under the 'name' property
        };
      })
    );

    setAllEventsData(eventsWithOrganizerNames);
  };

  const getEmail = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const yourEvents =
      allEventsData?.filter((event) => event.eventOrganizer === email) || [];
    setYourEventsData(yourEvents);
  };

  useEffect(() => {
    getAllEventsDetails();
  }, []);

  useEffect(() => {
    if (allEventsData) {
      getEmail();
    }
  }, [allEventsData]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "#E5E5E5",
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
              color: "#00A9FF"
              //   }}>View all</Text>
            }}
          >
            View all
          </Text>
        </View>
        {yourEventsData?.map((event, i) => {
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
                    uri: event?.eventCover
                  }}
                  style={{
                    width: 100,
                    height: 80,
                    borderRadius: 10,
                    resizeMode: "cover"
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text>
                    {new Date(event?.eventDateAndTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    }) +
                      " " +
                      new Date(event?.eventDateAndTime).toDateString()}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginVertical: 3
                    }}
                  >
                    {event?.eventName}
                  </Text>
                  <Text>{event?.eventOrganizerName}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
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
              color: "#00A9FF"
              //   }}>View all</Text>
            }}
          >
            View all
          </Text>
        </View>
        {allEventsData?.map((event, i) => {
          return (
            <Pressable
              onPress={() =>
                navigator.navigate("EventPage", { eventId: event.id })
              }
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
                    uri: event?.eventCover
                  }}
                  style={{
                    width: 100,
                    height: 80,
                    borderRadius: 10,
                    resizeMode: "cover"
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text>
                    {new Date(event?.eventDateAndTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    }) +
                      " " +
                      new Date(event?.eventDateAndTime).toDateString()}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginVertical: 3
                    }}
                  >
                    {event?.eventName}
                  </Text>
                  <Text>{event?.eventOrganizerName}</Text>
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
