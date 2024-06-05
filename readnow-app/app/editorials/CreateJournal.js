import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons, Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStorage from "expo-secure-store";
import { addJournal, editJournal, getSpecificJournal } from "../../api/apis";
import { ActivityIndicator, Dialog, Portal } from "react-native-paper";

const CreateJournal = () => {
  const [open, setOpen] = useState(false);
  const navigator = useNavigation();
  const route = useRoute();
  const { publisherId, isEdit, journalId } = route.params;
  const [journalData, setJournalData] = useState({
    journalTitle: "",
    journalDescription: "",
    journalPublishingDate: new Date(),
    journalEditorEmail: "",
    journalTags: [],
    journalCoverImage: "",
    publisherId,
    journalId,
    isJournalCoverImageSame: true
  });
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState({
    visible: false,
    message: ""
  });

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setJournalData({
        ...journalData,
        journalCoverImage: result.assets[0].uri,
        isJournalCoverImageSame: false
      });
    }
  };

  const postJournal = async () => {
    setLoading(true);
    const response = await addJournal(journalData);
    if (response && response.id) {
      navigator.navigate("JournalEditor", {
        publisherId,
        journalId: response.id
      });
    }
    setLoading(false);
  };

  const editJournalData = async () => {
    setLoading(true);
    const response = await editJournal(journalData);

    if (response.status === 200) {
      setShowDialog({
        visible: true,
        message: "Journal edited successfully"
      });
    } else {
      setShowDialog({
        visible: true,
        message: "Error editing journal"
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const setEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      setJournalData({
        ...journalData,
        journalEditorEmail: email
      });
    };
    setEmail();
  }, []);

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await getSpecificJournal(journalId);
      setJournalData({
        ...journalData,
        journalTitle: response.journal?.journalTitle,
        journalDescription: response.journal?.journalDescription,
        journalPublishingDate: new Date(
          response.journal?.journalPublishingDate
        ),
        journalEditorEmail: response.journal?.journalEditorEmail,
        journalTags: response.journal?.journalTags,
        journalCoverImage: response.journal?.journalCoverImage
      });
    };

    if (isEdit) {
      fetchJournal();
    }
  }, []);
  return (
    <ScrollView>
      <View>
        <Image
          source={{
            uri: journalData.journalCoverImage
              ? journalData.journalCoverImage
              : "https://picsum.photos/200/300"
          }}
          style={{
            width: "100%",
            height: 200
            // borderRadius: 5
          }}
        />
        <Pressable
          onPress={() => {
            selectImage();
          }}
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
          marginVertical: 20
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
            multiline={true}
            onChangeText={(text) => {
              setJournalData({
                ...journalData,
                journalTitle: text
              });
            }}
            value={journalData.journalTitle}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Journal title"
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
            onChangeText={(text) => {
              setJournalData({
                ...journalData,
                journalDescription: text
              });
            }}
            value={journalData.journalDescription}
            multiline
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Journal description"
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
              <Text>{journalData.journalPublishingDate.toDateString()}</Text>
              <Entypo name="calendar" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            date={journalData.journalPublishingDate}
            isVisible={open}
            mode="date"
            onConfirm={(date) => {
              setJournalData({
                ...journalData,
                journalPublishingDate: date
              });
              setOpen(false);
            }}
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
            onChangeText={(text) => {
              setJournalData({
                ...journalData,
                journalEditorEmail: text
              });
            }}
            value={journalData.journalEditorEmail}
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
            onChangeText={(text) => {
              setJournalData({
                ...journalData,
                journalTags: text.split(",")
              });
            }}
            value={journalData.journalTags.join(",")}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 5,
              marginBottom: 10
            }}
            placeholder="Journal tags (separated by commas)"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            isEdit ? editJournalData() : postJournal();
          }}
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
            {loading ? (
              <ActivityIndicator animating={loading} color="white" />
            ) : { isEdit } ? (
              "Edit Journal"
            ) : (
              "Create Journal"
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog
          visible={showDialog.visible}
          onDismiss={() => setShowDialog({ visible: false, message: "" })}
          style={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 20
          }}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>{showDialog.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => {
                navigator.goBack();
                setShowDialog({ visible: false, message: "" });
              }}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  // textAlign: "center"
                  fontWeight: "500"
                }}
              >
                Ok
              </Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default CreateJournal;
