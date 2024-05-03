import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import * as SecureStorage from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getSpecificEvent } from "../api/apis";

const RadioButtonOption = ({ value, currentMode, setMode }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10
    }}
  >
    <RadioButton
      value={value}
      status={currentMode === value ? "checked" : "unchecked"}
      onPress={() => setMode(value)}
    />
    <Text>{value.charAt(0).toUpperCase() + value.slice(1)}</Text>
  </View>
);

const CreateEvent = () => {
  const visibleSnackbar = useSelector((state) => state.event.eventSnackbar);
  const [open, setOpen] = useState(false);
  const [speaker, setSpeaker] = useState("");
  const dispatch = useDispatch();
  const eventUpdationMessage = useSelector(
    (state) => state.event.eventUpdationMessage
  );
  const [eventCreationData, setEventCreationData] = useState({
    eventOrganizer: "",
    eventName: "",
    eventMode: "video",
    eventDateAndTime: new Date(),
    eventSpeakers: [],
    eventDescription: "",
    eventCover: null,
    isEventCoverSame: false,
    eventId: null
  });
  const navigator = useNavigation();
  const route = useRoute();

  const { isEdit, eventId } = route.params;

  const currentEventId = useSelector((state) => state.event.currentEventId);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setEventCreationData({
        ...eventCreationData,
        eventCover: result.assets[0].uri,
        isEventCoverSame: false
      });
    }
  };
  useEffect(() => {
    const getEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      setEventCreationData({ ...eventCreationData, eventOrganizer: email });
    };
    getEmail();
  }, []);
  useEffect(() => {
    dispatch({
      type: "event/updateEventData",
      payload: { ...eventCreationData }
    });
  }, [eventCreationData]);

  useEffect(() => {
    if (isEdit) {
      const editEvent = async () => {
        const response = await getSpecificEvent(eventId);
        setEventCreationData({
          eventOrganizer: response?.eventOrganizer,
          eventName: response?.eventName,
          eventMode: response?.eventMode,
          eventDateAndTime: new Date(response?.eventDateAndTime),
          eventSpeakers: response?.eventSpeakers,
          eventDescription: response?.eventDescription,
          eventCover: response?.eventCover,
          isEventCoverSame: true,
          eventId: eventId
        });

        dispatch({
          type: "event/updateEditedEvent",
          payload: true
        });
      };

      editEvent();
    } else {
      dispatch({
        type: "event/updateEditedEvent",
        payload: false
      });
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingBottom: 10 }}>
          <View
            style={{
              paddingBottom: 20
            }}
          >
            <View
              style={{
                height: 200,
                backgroundColor: "gray"
              }}
            >
              <Pressable
                onPress={() => selectImage()}
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  elevation: 1,
                  zIndex: 1,
                  bottom: 10,
                  right: 10,
                  alignItems: "center"
                }}
              >
                <EvilIcons name="pencil" size={28} color="black" />
              </Pressable>
              <Image
                source={{
                  uri: eventCreationData.eventCover
                    ? eventCreationData.eventCover
                    : "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                }}
                style={{
                  width: "100%",
                  height: "100%",

                  position: "relative",
                  zIndex: 0
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Organizer*
            </Text>
            <TextInput
              value={eventCreationData.eventOrganizer}
              onChangeText={(text) =>
                setEventCreationData({
                  ...eventCreationData,
                  eventOrganizer: text
                })
              }
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Organizer email"
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event name*
            </Text>
            <TextInput
              multiline={true}
              value={eventCreationData.eventName}
              onChangeText={(text) =>
                setEventCreationData({ ...eventCreationData, eventName: text })
              }
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Your event name"
            />
          </View>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event mode*
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              <RadioButtonOption
                value="video"
                currentMode={eventCreationData.eventMode}
                setMode={(mode) =>
                  setEventCreationData({
                    ...eventCreationData,
                    eventMode: mode
                  })
                }
              />
              <RadioButtonOption
                value="audio"
                currentMode={eventCreationData.eventMode}
                setMode={(mode) =>
                  setEventCreationData({
                    ...eventCreationData,
                    eventMode: mode
                  })
                }
              />
              <RadioButtonOption
                value="hybrid"
                currentMode={eventCreationData.eventMode}
                setMode={(mode) =>
                  setEventCreationData({
                    ...eventCreationData,
                    eventMode: mode
                  })
                }
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event date and time*
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10
                }}
              >
                <Text>
                  {eventCreationData.eventDateAndTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  }) +
                    " " +
                    eventCreationData.eventDateAndTime.toDateString()}
                </Text>
                <Entypo name="calendar" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              date={eventCreationData.eventDateAndTime}
              isVisible={open}
              mode="datetime"
              onConfirm={(dateTime) => {
                setEventCreationData({
                  ...eventCreationData,
                  eventDateAndTime: dateTime
                });
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event speakers
            </Text>
            <TextInput
              value={speaker}
              onChangeText={(text) => setSpeaker(text)}
              onSubmitEditing={() => {
                // console.log(speaker);
                setEventCreationData({
                  ...eventCreationData,
                  eventSpeakers: [...eventCreationData.eventSpeakers, speaker]
                });
                setSpeaker(""); // Clear the input field
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Enter email then press done"
            />
            {eventCreationData?.eventSpeakers?.map((speaker, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "#49755D"
                    }}
                  >
                    {speaker}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setEventCreationData({
                        ...eventCreationData,
                        eventSpeakers: eventCreationData.eventSpeakers.filter(
                          (item) => item !== speaker
                        )
                      });
                    }}
                  >
                    <Entypo name="cross" size={24} color="black" />
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 10
                // color: "#49755D"
              }}
            >
              Event description
            </Text>
            <TextInput
              value={eventCreationData.eventDescription}
              onChangeText={(text) => {
                setEventCreationData({
                  ...eventCreationData,
                  eventDescription: text
                });
              }}
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="about this event..."
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => {}}
        action={{
          label: "Done",
          onPress: () => {
            dispatch({
              type: "event/updateSnackbarVisibility",
              payload: false
            });
            navigator.navigate("AdminEventPage", {
              currentEventId: currentEventId
            });
          }
        }}
      >
        {eventUpdationMessage}
      </Snackbar>
    </View>
  );
};

export default CreateEvent;
