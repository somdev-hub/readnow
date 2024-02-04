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
import { useRoute } from "@react-navigation/native";
import {
  addEventMedia,
  getCardProfile,
  getShortProfileInfo,
  getSpecificEvent
} from "../api/apis";

const AdminEventPage = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const bottomSheetRef = React.useRef(null);
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);
  const [eventMedia, setEventMedia] = React.useState(null);
  const dispatch = useDispatch();
  const route = useRoute();
  // const eventData = route.params.eventData;
  const [eventSpeakersData, setEventSpeakersData] = useState([]);
  const [eventOrganizerData, setEventOrganizerData] = useState({});
  const currentEventId = useSelector((state) => state.event.currentEventId);
  const [eventData, setEventData] = useState({});

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
      console.log(response);
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      const eventInfo = await getSpecificEvent(currentEventId);
      setEventData({
        ...eventInfo.data.attributes,
        eventDateAndTime: new Date(eventInfo.data.attributes.eventDateAndTime)
      });
    };
    const fetchOrganizerData = async () => {
      const organizerData = await getShortProfileInfo(
        eventData.eventOrganizer.toLowerCase()
      );
      setEventOrganizerData(organizerData);
    };
    const fetchSpeakersData = async () => {
      const speakerData = await Promise.all(
        eventData?.eventSpeakers?.map(async (speaker) => {
          const speakerInfo = await getCardProfile(speaker.toLowerCase());
          return speakerInfo;
        })
      );
      setEventSpeakersData(speakerData);
    };
    fetchEventData();
    fetchOrganizerData();
    fetchSpeakersData();
  }, []);

  console.log(eventData.eventSpeakers);
  console.log(eventSpeakersData);
  console.log(eventData.eventDateAndTime);

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
              style={{ width: 300, height: 300 }}
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
          {/* <View
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
              Live tomorrow
            </Text>
          </View> */}
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
            Event organized by {eventData?.eventOrganizer}
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
              {eventData?.eventDateAndTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }) +
                " " +
                eventData?.eventDateAndTime.toDateString()}
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
              200 attendees
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
                backgroundColor: "#00A9FF",
                padding: 7,
                borderRadius: 50,
                flex: 1
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Invite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#00A9FF",
                borderWidth: 1,
                padding: 7,
                borderRadius: 50,
                flex: 1
              }}
            >
              <Text style={{ color: "#00A9FF", textAlign: "center" }}>
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
            backgroundColor: "#fff",
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
            backgroundColor: "#fff"
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
            {/* <PeopleCard
              name="Dr. Sikha Sharma"
              header="Biochemist, IISER, Pune"
              tags="#Plant Healthcare, #Nutrition, #Agriculture, #Plant Science"
              followed={false}
              image="https://c.superprof.com/i/a/20975136/10127100/600/20220613124840/assistant-professor-lady-shri-ram-college-for-women-trained-teach-all-aspects-english-language.jpg"
              background="https://i.cbc.ca/1.4839023.1537972363!/fileImage/httpImage/image.png_gen/derivatives/16x9_780/plants-ft.png"
              userEmail="stevewings@gmail.com"
            /> */}
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

export default AdminEventPage;
