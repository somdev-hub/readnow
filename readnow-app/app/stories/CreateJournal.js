import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity
} from "react-native";
import React from "react";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

const CreateJournal = () => {
  const [open, setOpen] = React.useState(false);
  const navigator = useNavigation();
  return (
    <ScrollView>
      <View>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{
            width: "100%",
            height: 200
            // borderRadius: 5
          }}
        />
        <Pressable
          // onPress={() => {
          //   selectImage("groupCoverImage");
          // }}
          style={{
            position: "absolute",
            backgroundColor: PRIMARY_COLOR,
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
          <EvilIcons name="pencil" size={28} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 10
              // color: PRIMARY_COLOR
            }}
          >
            Enter journal title*
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Publisher Name"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 10
              // color: PRIMARY_COLOR
            }}
          >
            Enter journal description*
          </Text>
          <TextInput
            multiline
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Publisher Name"
          />
        </View>
        <View
          style={{
            marginBottom: 10
          }}
        >
          <Text
            style={{
              //   fontSize: 16,
              fontWeight: "500",
              marginBottom: 10
              // color: "#49755D"
            }}
          >
            Journal publishing date*
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
                {/* {eventCreationData.eventDateAndTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                }) +
                  " " +
                  eventCreationData.eventDateAndTime.toDateString()} */}
              </Text>
              <Entypo name="calendar" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            //   date={eventCreationData.eventDateAndTime}
            isVisible={open}
            mode="datetime"
            //   onConfirm={(dateTime) => {
            //     setEventCreationData({
            //       ...eventCreationData,
            //       eventDateAndTime: dateTime
            //     });
            //     setOpen(false);
            //   }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 10
              // color: PRIMARY_COLOR
            }}
          >
            Journal editor email*
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Publisher Name"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 10
              // color: PRIMARY_COLOR
            }}
          >
            Journal tags*
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Publisher Name"
          />
        </View>
        <TouchableOpacity
          onPress={() => navigator.navigate("JournalEditor")}
          style={{
            backgroundColor: PRIMARY_COLOR,
            paddingVertical: 12,
            borderRadius: 10,
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateJournal;
