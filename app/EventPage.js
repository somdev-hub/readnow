import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PeopleCard from "../components/PeopleCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import {
  getCardProfile,
  getShortProfileInfo,
  getSpecificEvent,
  toggleEventAttendence
} from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import { Video, ResizeMode } from "expo-av";

const EventPage = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const bottomSheetRef = React.useRef(null);
  const route = useRoute();
  const { eventId } = route.params;
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);
  const [eventData, setEventData] = useState({});
  const [attendingEvent, setAttendingEvent] = useState(false);
  const [numberofDaysLeft, setNumberofDaysLeft] = useState(0);
  const [playEventMedia, setPlayEventMedia] = useState(false);
  const videoControl = React.useRef(null);

  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleEventAttendence = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await toggleEventAttendence(eventId, email);
    if (response.data === "attendee added") {
      setAttendingEvent(true);
    } else if (response.data === "attendee removed") {
      setAttendingEvent(false);
    }
    console.log(response.data);
  };

  useEffect(() => {
    const getEventDetails = async () => {
      const response = await getSpecificEvent(eventId);
      console.log(response);
      const eventOrganizer = await getShortProfileInfo(
        response?.eventOrganizer.toLowerCase()
      );

      const speakerData = await Promise.all(
        response?.eventSpeakers?.map(async (speaker) => {
          const speakerInfo = await getCardProfile(speaker.toLowerCase());
          return speakerInfo;
        })
      );

      const email = await SecureStorage.getItemAsync("email");
      const attending = response?.eventAttendees?.includes(email);
      setAttendingEvent(attending);

      setNumberofDaysLeft(
        Math.floor(
          (new Date(response?.eventDateAndTime).getTime() -
            new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );

      const eventDataWithOrganizerAndSpeakers = {
        ...response,
        eventOrganizerName: eventOrganizer.data.name,
        eventSpeakers: speakerData
      };
      console.log(response);
      setEventData(eventDataWithOrganizerAndSpeakers);
      // setEventData(response);
    };
    getEventDetails();
  }, []);
  // console.log(response);
  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ position: "relative" }}>
          {eventData?.eventMedia && playEventMedia ? (
            <Video
              ref={videoControl}
              source={{ uri: eventData?.eventMedia }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={playEventMedia}
              // shouldPlay
              useNativeControls
              style={{
                width: "100%",
                height: 200
                // resizeMode: "cover"
              }}
              onError={(e) => console.log(e)}
            />
          ) : (
            <>
              <Image
                source={{
                  uri: eventData?.eventCover
                }}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover"
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 1,
                  position: "absolute",
                  top: 10,
                  left: 10,
                  alignItems: "center"
                }}
              >
                <Entypo name="dot-single" size={30} color="red" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  Live{" "}
                  {numberofDaysLeft > 0
                    ? numberofDaysLeft === 1
                      ? "tomorrow"
                      : `in ${numberofDaysLeft} days`
                    : "now"}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  setPlayEventMedia(true);
                  // videoControl.current.playAsync();
                }}
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "40%",
                  // marginHorizontal:"auto",
                  // transform: [{ translateX: -50 }, { translateY: -50 }],
                  backgroundColor: "#eeeeee",
                  opacity: 0.7,
                  padding: 10,
                  borderRadius: 50,
                  paddingHorizontal: 20
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  Play
                </Text>
              </Pressable>
            </>
          )}
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            elevation: 1
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500"
              //   }}>Workshop on plant healthcare and nutrition</Text>
            }}
          >
            {eventData?.eventName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginTop: 5
            }}
          >
            Event organized by {eventData?.eventOrganizerName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              {new Date(eventData?.eventDateAndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }) +
                " " +
                new Date(eventData?.eventDateAndTime).toDateString()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              alignItems: "center"
            }}
          >
            <Ionicons name="people-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              {eventData?.eventAttendees?.length} attendees
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              alignItems: "center"
            }}
          >
            <Ionicons name="videocam-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              Event mode - {eventData?.eventMode}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              gap: 5,
              width: "100%"
            }}
          >
            <TouchableOpacity
              onPress={handleEventAttendence}
              style={{
                backgroundColor: "#00A9FF",
                padding: 7,
                borderRadius: 50,
                flex: 1
                // elevation: 3
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {attendingEvent ? "Attending" : "Attend"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // backgroundColor: "#00A9FF",
                borderColor: "#00A9FF",
                borderWidth: 1,
                padding: 7,
                borderRadius: 50,
                flex: 1
                // elevation: 3
              }}
            >
              <Text style={{ color: "#00A9FF", textAlign: "center" }}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          onPress={() => open()}
          style={{
            marginVertical: 10,
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingVertical: 15,
            paddingHorizontal: 10,
            // marginHorizontal: 10,
            elevation: 1,
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 500 }}>Comments</Text>
          <Entypo name="chevron-down" size={22} color="black" />
        </Pressable>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            // marginTop: ,
            paddingVertical: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500"
              //   }}>Workshop on plant healthcare and nutrition</Text>
            }}
          >
            About
          </Text>
          <Text style={{ marginTop: 10 }}>{eventData?.eventDescription}</Text>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                color: "#00A9FF",
                fontWeight: "500",
                fontSize: 16,
                textAlign: "center"
              }}
            >
              More details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500"
            }}
          >
            Speakers
          </Text>
          <View>
            {eventData?.eventSpeakers?.map((speaker, index) => {
              return (
                <PeopleCard
                  key={index}
                  image={speaker?.profilePicture}
                  background={speaker?.backgroundPicture}
                  header={speaker?.header}
                  name={speaker?.name}
                  tags={speaker?.tags}
                  userEmail={speaker?.email}
                  followers={speaker?.followers}
                />
              );
            })}
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[height * 0.5, height * 0.9]}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 15
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10
            // paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            Comments
          </Text>
          <View
            style={{
              backgroundColor: "#eeeeee",
              paddingVertical: 10,
              paddingHorizontal: 10
            }}
          >
            <Text>
              Please keep the comment section respectful and clean to adhere to
              our community guidelines.
            </Text>
          </View>
          <View
            style={{
              // position: "absolute",
              // bottom: 0,
              borderTopColor: "#eeeeee",
              borderTopWidth: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10
              }}
            >
              <Image
                source={{
                  uri: "https://picsum.photos/200/300"
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: "cover"
                }}
              />
              <TextInput
                placeholder="Write a comment"
                style={{
                  flex: 1,
                  marginLeft: 10,
                  borderRadius: 50,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderWidth: 2,
                  borderColor: "#eeeeee"
                }}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default EventPage;
