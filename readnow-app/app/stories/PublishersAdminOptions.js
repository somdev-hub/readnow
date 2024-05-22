import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Portal, Dialog, Snackbar } from "react-native-paper";
import { deletePublisher } from "../../api/apis";
// imporrt {Portal}

const PublishersAdminOptions = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { publisherId } = route.params;
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    visible: false,
    message: ""
  });
  const settings = [
    {
      name: "Edit publisher info",
      icon: "pencil",
      route: "CreatePublisher",
      params: {
        publisherId: publisherId,
        isEdit: true
      }
    },
    {
      name: "Manage editors",
      icon: "email",
      route: "ManageEditors",
      params: {
        publisherId: publisherId
      }
    },
    {
      name: "Manage journals",
      icon: "book",
      route: "ManageJournals",
      params: {
        publisherId: publisherId
      }
    },
    {
      name: "Manage subscribers",
      icon: "user",
      route: "ManageSubscribers",
      params: {
        publisherId: publisherId
      }
    },

    {
      name: "Delete publisher",
      icon: "trash",
      route: "ManageComments",
      params: {}
    }
  ];
  return (
    <ScrollView>
      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 20 }}>
          Admin settings
        </Text>
        {settings.map((setting, index) => {
          return (
            <Pressable
              onPress={() => {
                setting.name === "Delete publisher"
                  ? setVisibleModal(true)
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
      <Portal>
        <Dialog
          visible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
          style={{
            backgroundColor: "white"
          }}
        >
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={{ textAlign: "center" }}>Alert</Dialog.Title>
          <Dialog.Content>
            <Text
            // style={{
            //   fontWeight: "500"
            // }}
            >
              Are you sure you want to delete this publisher?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => setVisibleModal(false)}
              style={{ marginRight: 20 }}
            >
              <Text style={{ fontWeight: "500" }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={async () => {
                const response = await deletePublisher(publisherId);
                if (response.status === 200) {
                  navigator.navigate("Publishers");
                } else {
                  setVisibleSnackbar({
                    visible: true,
                    message: "Failed to delete publisher"
                  });
                }
                setVisibleModal(false);
              }}
            >
              <Text style={{ color: "red", fontWeight: "500" }}>Delete</Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default PublishersAdminOptions;
