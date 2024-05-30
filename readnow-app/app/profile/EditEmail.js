import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useRoute } from "@react-navigation/native";
import { Dialog, Portal, Snackbar, TextInput } from "react-native-paper";

const EditEmail = () => {
  const route = useRoute();
  // const { email } = route.params;
  const [emails, setEmails] = useState({
    currentEmail: "",
    newEmail: ""
  });
  const [DialogVisible, setDialogVisible] = useState(false);
  const [InputDialogVisible, setInputDialogVisible] = useState(false);
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
            flexDirection: "row"
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
              jason123@gmail.com
            </Text>
            <View
              style={{
                backgroundColor: "green",
                // color:WHITE_COLOR,
                opacity: 0.3,
                // padding: 5,
                paddingVertical:3,
                paddingHorizontal:10,
                borderRadius: 50
              }}
            >
              <Text style={{
                fontSize:12,
                // opacity:1,
                // color:WHITE_COLOR
              }}>primary</Text>
            </View>
          </View>
          <Pressable
            onPress={() => setDialogVisible(true)}
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
          visible={DialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>Add a new email before deleting the primary email!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable onPress={() => setDialogVisible(false)}>
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: "500"
                }}
              >
                Ok
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
              style={{
                backgroundColor: WHITE_COLOR
              }}
              outlineColor={PRIMARY_COLOR}
              activeOutlineColor={PRIMARY_COLOR}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable onPress={() => setInputDialogVisible(false)}>
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
    </View>
  );
};

export default EditEmail;
