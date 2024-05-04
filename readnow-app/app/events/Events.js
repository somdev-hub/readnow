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
import { getAllEventShortInfo, getShortProfileInfo } from "../../api/apis";
import { PRIMARY_COLOR } from "../../styles/colors";

const Events = () => {
  const navigator = useNavigation();
  const [allEventsData, setAllEventsData] = useState([]);
  const [pastEventData, setPastEventData] = useState([]);

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

    const pastEvents = response.filter(
      (event) => new Date(event.eventDateAndTime) < new Date()
    );
    const currentEvents = eventsWithOrganizerNames.filter(
      (event) => new Date(event.eventDateAndTime) >= new Date()
    );

    setAllEventsData(currentEvents);
    setPastEventData(pastEvents);
  };

  useEffect(() => {
    getAllEventsDetails();
  }, []);

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
              color: PRIMARY_COLOR
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
            Past events
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: PRIMARY_COLOR
              //   }}>View all</Text>
            }}
          >
            View all
          </Text>
        </View>
        {pastEventData?.map((event, i) => {
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
