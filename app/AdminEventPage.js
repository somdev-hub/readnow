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
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PeopleCard from "../components/PeopleCard";
import BottomSheet from "@gorhom/bottom-sheet";
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from "expo-av";
// import { Audio } from 'expo-av';
import { useDispatch, useSelector } from "react-redux";

const AdminEventPage = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const bottomSheetRef = React.useRef(null);
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);
  const [eventMedia, setEventMedia] = React.useState(null);
  const dispatch = useDispatch();

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
    }
  };

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
            Workshop on plant healthcare and nutrition, acheiving the best
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginTop: 5
            }}
          >
            Event organized by Dr. Pradeep Singh
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
              21 Dec, 2020, Thursday, 4:00pm - 5:00pm
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
              Event mode - Video
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
          <Text style={{ marginTop: 10 }}>
            Adipisicing reprehenderit esse consectetur quis nulla magna ipsum
            veniam. Qui quis reprehenderit deserunt laboris ipsum. Incididunt
            dolore in consectetur consequat incididunt veniam mollit ipsum
            proident commodo eu deserunt sit ex. Tempor ad magna dolor et
            laborum laboris reprehenderit. Dolore magna aliquip aute non non
            proident anim. Sit est exercitation ea proident laboris ipsum. Id
            nostrud cupidatat cupidatat adipisicing. Anim sint veniam in sint
            anim officia.
          </Text>
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
            <PeopleCard
              name="Dr. Pradeep Singh"
              header="Professor, IIT Kanpur"
              tags="#Plant Healthcare, #Nutrition, #Agriculture, #Plant Science"
              followed={false}
              image="https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png"
              background="https://hips.hearstapps.com/hmg-prod/images/indoor-plants-1-64f051a37d451.jpg"
              userEmail="stevewings@gmail.com"
            />
            <PeopleCard
              name="Dr. Sikha Sharma"
              header="Biochemist, IISER, Pune"
              tags="#Plant Healthcare, #Nutrition, #Agriculture, #Plant Science"
              followed={false}
              image="https://c.superprof.com/i/a/20975136/10127100/600/20220613124840/assistant-professor-lady-shri-ram-college-for-women-trained-teach-all-aspects-english-language.jpg"
              background="https://i.cbc.ca/1.4839023.1537972363!/fileImage/httpImage/image.png_gen/derivatives/16x9_780/plants-ft.png"
              userEmail="stevewings@gmail.com"
            />
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
