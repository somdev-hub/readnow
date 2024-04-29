import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const GroupSettings = () => {
  const settings = [
    {
      name: "Manage admins",
      icon: "user"
    },
    {
      name: "Posts",
      icon: "book"
    },
    {
      name: "Members",
      icon: "users"
    },
    {
      name: "Requests",
      icon: "user"
    },
    {
      name: "Edit group info",
      icon: "edit"
    },
    {
      name: "Delete group",
      icon: "trash"
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
    </View>
  );
};

export default GroupSettings;
