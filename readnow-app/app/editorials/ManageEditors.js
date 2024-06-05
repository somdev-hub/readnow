import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { Menu, Modal, Portal, TextInput, Snackbar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import { useRoute } from "@react-navigation/native";
import {
  addEditor,
  getShortProfileInfo,
  getSpecificPublisher,
  removeEditor
} from "../../api/apis";

const ManageEditors = () => {
  const route = useRoute();
  const { publisherId } = route.params;
  const [editors, setEditors] = useState([]);
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const [visibleModal, setVisibleModal] = useState(false);
  const [editorEmail, setEditorEmail] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState({
    visible: false,
    message: ""
  });

  const remove = async (email) => {
    const response = await removeEditor(publisherId, email);
    if (response.status === 200) {
      setVisibleSnackbar({
        visible: true,
        message: "Editor removed successfully"
      });
    } else {
      setVisibleSnackbar({
        visible: true,
        message: "Error removing editor"
      });
    }
  };

  const add = async () => {
    const response = await addEditor(publisherId, editorEmail);
    if (response.status === 200) {
      setVisibleSnackbar({
        visible: true,
        message: "Editor added successfully"
      });
    } else {
      setVisibleSnackbar({
        visible: true,
        message: "Error adding editor"
      });
    }
  };

  useEffect(() => {
    const getEditors = async () => {
      const {
        publisherData: { publisher }
      } = await getSpecificPublisher(publisherId);
      const editorsWithData = await Promise.all(
        publisher?.editorEmails.map(async (email) => {
          const response = await getShortProfileInfo(email);
          return {
            editorData: response.data
          };
        })
      );

      setEditors(editorsWithData);
    };
    getEditors();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
            marginLeft: 10
          }}
        >
          Editors
        </Text>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 20
          }}
        >
          {editors?.map((editor, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginBottom: 15,
                  flex: 1
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                  }}
                >
                  <Image
                    source={{
                      uri: editor?.editorData?.profilePicture
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {editor?.editorData?.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#A9A9A9" }}>
                      {editor?.editorData?.header}
                    </Text>
                  </View>
                </View>
                <Menu
                  visible={visibleMenu.visible && visibleMenu.index === index}
                  onDismiss={() => {
                    setVisibleMenu({
                      visible: false,
                      index: null
                    });
                  }}
                  anchor={
                    <Pressable
                      onPress={() =>
                        setVisibleMenu({
                          visible: true,
                          index
                        })
                      }
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color="black"
                      />
                    </Pressable>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      remove(editor?.editorData?.email);
                      setVisibleMenu({
                        visible: false,
                        index: null
                      });
                    }}
                    title="Remove"
                  />
                </Menu>
              </View>
            );
          })}
        </View>
        <Pressable
          onPress={() => {
            setVisibleModal(true);
          }}
          style={{
            marginHorizontal: 15,
            marginTop: 10,

            borderRadius: 5,

            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: PRIMARY_COLOR
            }}
          >
            Add editors
          </Text>
        </Pressable>
      </ScrollView>
      <Portal>
        <Modal
          visible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 20
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Add editors</Text>
          <TextInput
            onChangeText={(text) => setEditorEmail(text)}
            value={editorEmail}
            mode="outlined"
            label="Admin email"
            outlineColor="black"
            style={{ backgroundColor: "white", marginTop: 20 }}
            activeOutlineColor={PRIMARY_COLOR}
          />

          <TouchableOpacity
            onPress={() => {
              add();
              setVisibleModal(false);
            }}
            style={{
              backgroundColor: PRIMARY_COLOR,
              padding: 10,
              borderRadius: 5,
              marginTop: 20
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <Snackbar
        visible={visibleSnackbar.visible}
        onDismiss={() => setVisibleSnackbar({ visible: false, message: "" })}
        action={{
          label: "Ok",
          onPress: () => {
            setVisibleSnackbar({ visible: false, message: "" });
          }
        }}
      >
        {visibleSnackbar.message}
      </Snackbar>
    </ScrollView>
  );
};

export default ManageEditors;
