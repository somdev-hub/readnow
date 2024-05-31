import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../styles/colors";
import { changePassword } from "../../api/apis";
import {
  CommonActions,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { Portal, Dialog, Snackbar } from "react-native-paper";

const ChangePassword = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigator = useNavigation();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    message: ""
  });
  const [dialogVisible, setDialogVisible] = useState({
    visible: false,
    message: ""
  });

  const passwordChangeHandler = async () => {
    if (
      passwords.currentPassword.length === 0 ||
      passwords.newPassword.length === 0 ||
      passwords.confirmPassword.length === 0
    ) {
      setDialogVisible({
        visible: true,
        message: "All fields are required"
      });
      return;
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      setDialogVisible({
        visible: true,
        message: "Passwords do not match"
      });
      return;
    } else if (passwords.currentPassword === passwords.newPassword) {
      setDialogVisible({
        visible: true,
        message: "New password must be different from current password"
      });
      return;
    }
    const response = await changePassword(
      email,
      passwords.currentPassword,
      passwords.newPassword
    );
    if (response.data.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Password changed successfully"
      });
      navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }]
        })
      );
    } else {
      setSnackbarVisible({
        visible: true,
        message: response.data.message
      });
    }
  };
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          //   textAlign: "center",
          marginLeft: 20,
          marginTop: 10
        }}
      >
        Change your password
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 14,
            // textAlign: "center",
            marginLeft: 20,
            marginTop: 10,
            fontWeight: "500"
          }}
        >
          Enter your current password
        </Text>
        <TextInput
          onChangeText={(text) =>
            setPasswords({ ...passwords, currentPassword: text })
          }
          value={passwords.currentPassword}
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            padding: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: PRIMARY_COLOR
          }}
          placeholder="Current password"
        />
        <Text
          style={{
            fontSize: 14,
            // textAlign: "center",
            marginLeft: 20,
            marginTop: 10,
            fontWeight: "500"
          }}
        >
          Enter your new password
        </Text>
        <TextInput
          onChangeText={(text) =>
            setPasswords({ ...passwords, newPassword: text })
          }
          value={passwords.newPassword}
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            padding: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: PRIMARY_COLOR
          }}
          placeholder="New password"
        />
        <Text
          style={{
            fontSize: 14,
            // textAlign: "center",
            marginLeft: 20,
            marginTop: 10,
            fontWeight: "500"
          }}
        >
          Enter your new password again
        </Text>
        <TextInput
          onChangeText={(text) =>
            setPasswords({ ...passwords, confirmPassword: text })
          }
          value={passwords.confirmPassword}
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            padding: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: PRIMARY_COLOR
          }}
          placeholder="New password"
        />
        <TouchableOpacity onPress={passwordChangeHandler}>
          <Text
            style={{
              backgroundColor: PRIMARY_COLOR,
              color: "white",
              padding: 10,
              textAlign: "center",
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 10,
              fontWeight: "500"
            }}
          >
            Change password
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog
          visible={dialogVisible.visible}
          onDismiss={() => setDialogVisible({ visible: false, message: "" })}
          style={{
            backgroundColor: "white"
          }}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogVisible.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              onPress={() => setDialogVisible({ visible: false, message: "" })}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: "500"
                }}
              >
                Okay
              </Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackbarVisible.visible}
        onDismiss={() => setSnackbarVisible({ visible: false, message: "" })}
      >
        {snackbarVisible.message}
      </Snackbar>
    </View>
  );
};

export default ChangePassword;
