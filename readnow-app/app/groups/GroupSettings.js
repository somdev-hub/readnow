import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dialog, Portal } from "react-native-paper";
import { PRIMARY_COLOR } from "../../styles/colors";

const GroupSettings = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const settings = [
    {
      name: "Manage admins",
      icon: "user",
      route: "ManageGroupAdmins",
      params: {
        groupId: groupId
      }
    },
    {
      name: "Posts",
      icon: "book",
      route: "ManageGroupAdmins",
      params: {}
    },
    {
      name: "Members",
      icon: "users",
      route: "ManageGroupMembers",
      params: {}
    },
    {
      name: "Requests",
      icon: "user",
      route: "ManageGroupAdmins",
      params: {
        groupId: "123"
      }
    },
    {
      name: "Edit group info",
      icon: "edit",
      route: "CreateGroup",
      params: {
        groupId,
        edit: true
      }
    },
    {
      name: "Delete group",
      icon: "trash",
      route: "ManageGroupAdmins",
      params: {}
    }
  ];
  const generalSettings = [
    {
      name: "Notifications",
      icon: "bell"
    },
    {
      name: "Privacy",
      icon: "lock"
    },
    {
      name: "Help",
      icon: "help"
    },
    {
      name: "About",
      icon: "info"
    },
    {
      name: "Terms of use",
      icon: "text-document"
    },
    {
      name: "Logout",
      icon: "log-out"
    }
  ];
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 20 }}>
            Admin settings
          </Text>
          {settings.map((setting, index) => {
            return (
              <Pressable
                onPress={() => {
                  setting.name === "Delete group"
                    ? setDialogVisible(true)
                    : navigator.navigate(
                        setting.route,
                        setting.params && setting.params
                      );
                }}
                key={index}
                style={{
                  marginVertical: 10,
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <Entypo name={setting.icon} size={20} color="#A9A9A9" />
                <Text style={{ fontSize: 16 }}>{setting.name}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 20 }}>
            General settings
          </Text>
          {generalSettings.map((setting, index) => {
            return (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <Entypo name={setting.icon} size={20} color="#A9A9A9" />
                <Text style={{ fontSize: 16 }}>{setting.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={{
            backgroundColor: "white"
          }}
        >
          <Dialog.Icon icon="alert" />
          <Dialog.Title
            style={{
              textAlign: "center"
            }}
          >
            Alert
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete this group? This action is
              irreversible!
            </Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              gap: 10
            }}
          >
            <Pressable onPress={() => setDialogVisible(false)}>
              <Text
                style={{
                  fontWeight: "500"
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={() => setDialogVisible(false)}>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#C40C0C"
                }}
              >
                Delete
              </Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default GroupSettings;
