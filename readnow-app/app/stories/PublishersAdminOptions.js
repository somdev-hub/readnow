import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PublishersAdminOptions = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { publisherId } = route.params;
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
      route: "ManageTags",
      params: {}
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
                navigator.navigate(
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
    </ScrollView>
  );
};

export default PublishersAdminOptions;
