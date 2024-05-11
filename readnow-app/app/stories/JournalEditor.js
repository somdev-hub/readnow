import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable
} from "react-native";
import React, { useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox, FAB } from "react-native-paper";
import {
  CodeBridge,
  darkEditorCss,
  darkEditorTheme,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  useEditorContent
} from "@10play/tentap-editor";
import { Dialog, Portal, TextInput as RNPTextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

const initialContent = `<blockquote><p>This is a content</p></blockquote>`;

const JournalEditor = () => {
  const height = Dimensions.get("window").height;
  const bottomSheetRef = React.useRef(null);
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);
  const dispatch = useDispatch();
  const publishJournalDialog = useSelector(
    (state) => state.journal.publishJournal
  );
  console.log(publishJournalDialog);

  const options = [
    {
      icon: "bold",
      title: "Bold"
    },
    {
      icon: "list",
      title: "List"
    },
    {
      icon: "star",
      title: "AI"
    },
    {
      icon: "image",
      title: "Image"
    },
    {
      icon: "file-text",
      title: "Document"
    },
    {
      icon: "video",
      title: "Video"
    }
  ];
  const customStyles = `code {
    background-color: #f4f4f4;
    padding:30px;
  }`;
  const customCodeBlockCSS = `
code {
    background-color: #ffdede;
    border-radius: 0.25em;
    border-color: #e45d5d;
    border-width: 1px;
    border-style: solid;
    box-decoration-break: clone;
    color: #cd4242;
    font-size: 0.9rem;
    padding: 0.25em;
}
`;
  const editor = useEditorBridge({
    autofocus: true,
    theme: darkEditorTheme,
    bridgeExtensions: [
      ...TenTapStartKit,
      CodeBridge.configureCSS(customCodeBlockCSS)
    ]
  });
  const content = useEditorContent(editor, { type: "html" });
  // console.log(content);
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView
        contentContainerStyle={{
          // padding: 10,
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: WHITE_COLOR
          // height: height * 0.8
        }}
      >
        {/* <TextInput
          multiline={true}
          placeholder="Write your journal here..."
          style={{
            flex: 1
            // height: height * 0.9,
          }}
        /> */}

        <RichText
          editor={editor}
          style={{
            // flex: 1,
            // backgroundColor: "white",
            padding: 10
          }}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
      <FAB
        onPress={() => open()}
        icon="pencil"
        style={{
          position: "absolute",
          backgroundColor: PRIMARY_COLOR,
          bottom: 50,
          right: 30
        }}
        color="white"
      />
      <BottomSheet
        enableContentPanningGesture={false}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[height * 0.1, height * 0.35]}
        enablePanDownToClose={true}
        style={{
          backgroundColor: WHITE_COLOR,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 5
        }}
      >
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          {options.map((option, index) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  width: "33%",
                  marginBottom: 20
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Feather name={option.icon} size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 15,
                    textAlign: "center",
                    marginTop: 5
                  }}
                >
                  {option.title}
                </Text>
              </View>
            );
          })}
        </View>
      </BottomSheet>
      <Portal>
        <Dialog
          visible={publishJournalDialog}
          onDismiss={() => {
            dispatch({
              type: "journal/updatePublishJournal",
              payload: false
            });
          }}
          style={{
            borderRadius: 20,
            backgroundColor: "white"
          }}
        >
          <Dialog.Title>Publish Journal</Dialog.Title>

          <Dialog.Content>
            {/* <TextInput
              placeholder="Enter chapter name"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
            /> */}
            <RNPTextInput
              mode="outlined"
              label="Enter chapter name"
              activeOutlineColor={PRIMARY_COLOR}
              style={{
                backgroundColor: WHITE_COLOR,
                marginBottom: 10
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Checkbox
                status="checked"
                onPress={() => {}}
                color={PRIMARY_COLOR}
              />
              <Text
                style={
                  {
                    // fontWeight: "500",
                    // fontSize: 12
                  }
                }
              >
                Publish as standalone article
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => {
                dispatch({
                  type: "journal/updatePublishJournal",
                  payload: false
                });
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  marginRight: 15
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Text
              style={{
                fontWeight: "500"
              }}
            >
              Ok
            </Text>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0
  }
});

export default JournalEditor;
