import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import { Menu, Modal, Portal, TextInput, Searchbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const ManageGroupMembers = () => {
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const [visibleModal, setVisibleModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  return (
    <View>
      <Searchbar
        mode="bar"
        // label="Search members"
        placeholder="Search members"
        style={{
          marginHorizontal: 10,
          marginTop: 15,
          backgroundColor: "#DDE6ED"
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 15,
          marginTop: 20
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: PRIMARY_COLOR,
            padding: 7,
            elevation: 1,
            borderRadius: 5,
            flexDirection: "row",
            gap: 5
          }}
        >
          <FontAwesome name="sort" size={20} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "500"
            }}
          >
            Sort by
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: PRIMARY_COLOR,
            padding: 7,
            elevation: 1,
            borderRadius: 5,
            flexDirection: "row",
            gap: 5
          }}
        >
          <Feather name="filter" size={20} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "500"
            }}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 20,
          marginLeft: 10
        }}
      >
        Group Members
      </Text>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 20
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: "#A9A9A9",
                borderBottomWidth: 1,
                paddingBottom: 10,
                marginBottom: 15
              }}
              key={index}
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
                    uri: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    John Doe
                  </Text>
                  <Text style={{ fontSize: 14, color: "#A9A9A9" }}>Admin</Text>
                </View>
              </View>
              <Menu
                visible={visibleMenu.visible && visibleMenu.index === index}
                onDismiss={() =>
                  setVisibleMenu({
                    visible: false,
                    index: null
                  })
                }
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
                  onPress={() => {}}
                  title="Make admin"
                  leadingIcon="star"
                />
                <Menu.Item
                  onPress={() => {}}
                  title="Remove"
                  leadingIcon="delete"
                />
              </Menu>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ManageGroupMembers;
