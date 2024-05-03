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
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from "expo-av";
// import { Audio } from 'expo-av';
import { useDispatch, useSelector } from "react-redux";
import {
  addEventMedia,
  getCardProfile,
  getShortProfileInfo,
  getSpecificEvent
} from "../api/apis";
import { PRIMARY_COLOR, WHITE_COLOR } from "../styles/colors";
import { useRoute } from "@react-navigation/native";
import EventCommentSection from "../components/EventCommentSection";

const AdminEventPage = () => {
  const height = Dimensions.get("window").height;
  const bottomSheetRef = React.useRef(null);
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);
  const [eventMedia, setEventMedia] = React.useState(null);
  const dispatch = useDispatch();
  const [eventSpeakersData, setEventSpeakersData] = useState([]);
  const [eventOrganizerData, setEventOrganizerData] = useState({});
  const [eventData, setEventData] = useState({});

  const route = useRoute();

  const { currentEventId } = route.params;

  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "video/*", // All files
      copyToCacheDirectory: true // For easier access to file
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri); // This is the local file URI
      setEventMedia(result.assets[0].uri);
      dispatch({
        type: "event/updateEventMedia",
        payload: result.assets[0].uri
      });
      const response = await addEventMedia(
        result.assets[0].uri,
        currentEventId
      );
      // console.log(response);
    }
  };

  useEffect(() => {
    dispatch({
      type: "event/updateCurrentEventId",
      payload: currentEventId
    });

    const fetchEventData = async () => {
      const eventInfo = await getSpecificEvent(currentEventId);
      // console.log(eventInfo);
      if (eventInfo) {
        const eventCommentsData = await Promise.all(
          eventInfo?.eventComments?.map(async (comment) => {
            const commentUser = await getShortProfileInfo(comment?.commentedBy);
            return {
              user: commentUser?.data,
              comment: comment.comment,
              commentedOn: new Date(comment.commentedOn).toLocaleString()
            };
          })
        );

        setEventData({
          ...eventInfo,
          eventDateAndTime: new Date(eventInfo?.eventDateAndTime),
          eventComments: eventCommentsData
        });
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchOrganizerData = async () => {
      if (eventData?.eventOrganizer) {
        const organizerData = await getShortProfileInfo(
          eventData.eventOrganizer.toLowerCase()
        );
        if (organizerData) {
          setEventOrganizerData(organizerData.data);
        }
      }
    };

    const fetchSpeakersData = async () => {
      if (eventData?.eventSpeakers) {
        const speakerData = await Promise.all(
          eventData.eventSpeakers.map(async (speaker) => {
            const speakerInfo = await getCardProfile(speaker.toLowerCase());
            return speakerInfo;
          })
        );
        if (speakerData) {
          setEventSpeakersData(speakerData);
        }
      }
    };

    if (eventData) {
      fetchOrganizerData();
      fetchSpeakersData();
    }
  }, [eventData]);

  // console.log(eventData?.eventSpeakers);
  // console.log(eventSpeakersData);
  // console.log(eventData?.eventDateAndTime);

  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ position: "relative", alignItems: "center" }}>
          {!eventMedia ? (
            <Image
              source={require("../assets/upload-image-bg.jpg")}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover"
              }}
            />
          ) : (
            <Video
              source={{ uri: eventMedia }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              style={{ width: "100%", height: 200 }}
            />
          )}
          <Pressable
            onPress={() => pickFile()}
            style={{
              position: "absolute",
              bottom: "35%",
              right: "35%",
              backgroundColor: "#eeeeee",
              opacity: 0.7,
              padding: 10,
              borderRadius: 50
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "500"
              }}
            >
              Upload media
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 10,
            backgroundColor: WHITE_COLOR,
            elevation: 1
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500"
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
            Event organized by {eventOrganizerData?.name}
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
              {eventData?.eventDateAndTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }) +
                " " +
                eventData?.eventDateAndTime?.toDateString()}
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
              style={{
                backgroundColor: PRIMARY_COLOR,
                padding: 7,
                borderRadius: 50,
                flex: 1
              }}
            >
              <Text style={{ color: WHITE_COLOR, textAlign: "center" }}>
                Invite
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: PRIMARY_COLOR,
                borderWidth: 1,
                padding: 7,
                borderRadius: 50,
                flex: 1
              }}
            >
              <Text style={{ color: PRIMARY_COLOR, textAlign: "center" }}>
                Options
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          onPress={() => open()}
          style={{
            marginVertical: 10,
            flexDirection: "row",
            backgroundColor: WHITE_COLOR,
            paddingVertical: 15,
            paddingHorizontal: 10,
            // marginHorizontal: 10,
            elevation: 1,
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 500 }}>Live Comments</Text>
          <Entypo name="chevron-down" size={22} color="black" />
        </Pressable>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: WHITE_COLOR
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500"
            }}
          >
            About
          </Text>
          <Text style={{ marginTop: 10 }}>{eventData?.eventDescription}</Text>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                color: PRIMARY_COLOR,
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
            backgroundColor: WHITE_COLOR
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
            {eventSpeakersData?.map((speaker, index) => {
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
        enableContentPanningGesture={false}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[height * 0.5, height * 0.9]}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        style={{
          backgroundColor: WHITE_COLOR,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 15
        }}
      >
        {/* <View
          style={{
            backgroundColor: WHITE_COLOR,
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
        </View> */}

        {eventData.eventComments && (
          <EventCommentSection
            eventId={currentEventId}
            eventComments={eventData?.eventComments}
          />
        )}
      </BottomSheet>
    </View>
  );
};

export default AdminEventPage;
