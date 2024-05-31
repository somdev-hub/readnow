import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native";
import { Dialog, Portal, Snackbar, TextInput } from "react-native-paper";
import {
  addAsPrimaryEmail,
  getProfile,
  toggleOtherEmail
} from "../../api/apis";
import * as SecureStorage from "expo-secure-store";

const EditEmail = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const { email } = route.params;
  const [emails, setEmails] = useState({
    primaryEmail: email,
    newEmails: []
  });
  const [DialogVisible, setDialogVisible] = useState({
    visible: false,
    deleteEmail: "",
    delete: false,
    primaryEmail: "",
    primary: false,
    message: ""
  });
  const [InputDialogVisible, setInputDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    message: ""
  });
  const [newEmail, setNewEmail] = useState("");

  const toggleEmailEntry = async (otherEmail) => {
    const response = await toggleOtherEmail(email, otherEmail);
    if (response.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Email added successfully!"
      });
    }
    // console.log(response);
  };

  const toggleEmailDelete = async (otherEmail) => {
    const response = await toggleOtherEmail(email, otherEmail);
    if (response.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Email deleted successfully!"
      });
    }
    // console.log(response);
  };

  const togglePrimaryEmail = async (otherEmail) => {
    const response = await addAsPrimaryEmail(email, otherEmail);
    if (response.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Email set as primary successfully!"
      });
      SecureStorage.deleteItemAsync("email");
      SecureStorage.deleteItemAsync("token");
      navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }]
        })
      );
    }
    // console.log(response);
  };

  useEffect(() => {
    const fetchOtherEmails = async () => {
      const response = await getProfile(email);
      let primaryEmail = null;
      let newEmails = [];

      response?.data?.userData?.otherEmails.forEach((email) => {
        if (email.isPrimary) {
          primaryEmail = email;
        } else {
          newEmails.push(email);
        }
      });

      setEmails({
        ...emails,
        primaryEmail: primaryEmail,
        newEmails: newEmails
      });
    };
    fetchOtherEmails();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500"
        }}
      >
        Your Emails
      </Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: WHITE_COLOR,
            borderRadius: 20,
            elevation: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                //   fontSize: 16,
                fontWeight: "500"
              }}
            >
              {emails?.primaryEmail?.email}
            </Text>

            <View
              style={{
                backgroundColor: "green",
                opacity: 0.3,
                paddingVertical: 3,
                paddingHorizontal: 10,
                borderRadius: 50
              }}
            >
              <Text
                style={{
                  fontSize: 12
                }}
              >
                primary
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() =>
              setDialogVisible({
                visible: true,
                message: "Add a new email before deleting the primary email!"
              })
            }
            style={{
              backgroundColor: "red",
              opacity: 0.3,
              padding: 2,
              borderRadius: 50
            }}
          >
            <Entypo name="minus" size={24} color="black" />
          </Pressable>
        </View>
        {emails?.newEmails.map((email, index) => {
          return (
            <View
              key={index}
              style={{
                padding: 20,
                backgroundColor: WHITE_COLOR,
                borderRadius: 20,
                elevation: 1,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    //   fontSize: 16,
                    fontWeight: "500"
                  }}
                >
                  {email?.email}
                </Text>
                {email?.isPrimary && (
                  <View
                    style={{
                      backgroundColor: "green",
                      opacity: 0.3,
                      paddingVertical: 3,
                      paddingHorizontal: 10,
                      borderRadius: 50
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12
                      }}
                    >
                      primary
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center"
                }}
              >
                <Pressable
                  onPress={() =>
                    setDialogVisible({
                      visible: true,
                      message: "Delete this email?",
                      deleteEmail: email.email,
                      delete: true
                    })
                  }
                  style={{
                    backgroundColor: "red",
                    opacity: 0.3,
                    padding: 2,
                    borderRadius: 50
                  }}
                >
                  <Entypo name="minus" size={24} color="black" />
                </Pressable>
                <Pressable
                  onPress={() =>
                    setDialogVisible({
                      visible: true,
                      message: "Set this email as primary?",
                      primaryEmail: email.email,
                      primary: true
                    })
                  }
                  style={{
                    backgroundColor: "green",
                    opacity: 0.3,
                    padding: 2,
                    borderRadius: 50
                  }}
                >
                  <Entypo name="plus" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
      <Pressable onPress={() => setInputDialogVisible(true)}>
        <Text
          style={{
            marginTop: 20,
            color: PRIMARY_COLOR,
            fontWeight: "500",
            textAlign: "center"
          }}
        >
          Add Email
        </Text>
      </Pressable>
      <Portal>
        <Dialog
          style={{
            backgroundColor: "white"
          }}
          visible={DialogVisible.visible}
          onDismiss={() =>
            setDialogVisible({
              visible: false,
              message: "",
              deleteEmail: "",
              delete: false,
              primaryEmail: "",
              primary: false
            })
          }
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>{DialogVisible.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => {
                if (DialogVisible.delete) {
                  toggleEmailDelete(DialogVisible.deleteEmail);
                  setDialogVisible({
                    visible: false,
                    message: "",
                    deleteEmail: "",
                    delete: false
                  });
                } else if (DialogVisible.primary) {
                  togglePrimaryEmail(DialogVisible.primaryEmail);
                  setDialogVisible({
                    visible: false,
                    message: "",
                    deleteEmail: "",
                    delete: false,
                    primaryEmail: "",
                    primary: false
                  });
                } else {
                  setDialogVisible({
                    visible: false,
                    message: "",
                    deleteEmail: "",
                    delete: false
                  });
                }
              }}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: "500"
                }}
              >
                {DialogVisible.delete
                  ? "Delete"
                  : DialogVisible.primary
                  ? "Set as primary"
                  : "Ok"}
              </Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          style={{
            backgroundColor: "white"
          }}
          visible={InputDialogVisible}
          onDismiss={() => setInputDialogVisible(false)}
        >
          <Dialog.Title>Add email</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              // placeholder="Email"
              label="Email"
              value={newEmail}
              onChangeText={(text) => setNewEmail(text)}
              style={{
                backgroundColor: WHITE_COLOR
              }}
              outlineColor={PRIMARY_COLOR}
              activeOutlineColor={PRIMARY_COLOR}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => {
                toggleEmailEntry(newEmail);
                setInputDialogVisible(false);
                setNewEmail("");
              }}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: "500"
                }}
              >
                Add
              </Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackbarVisible.visible}
        onDismiss={() =>
          setSnackbarVisible({
            visible: false,
            message: ""
          })
        }
      >
        {snackbarVisible.message}
      </Snackbar>
    </View>
  );
};

export default EditEmail;
