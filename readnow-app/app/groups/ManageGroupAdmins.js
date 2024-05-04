import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import { Menu, Modal, Portal, TextInput } from "react-native-paper";

const ManageGroupAdmins = () => {
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const [visibleModal, setVisibleModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 10,
          marginLeft: 10
        }}
      >
        Group Admins
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
                  title="Remove"
                  leadingIcon="delete"
                />
              </Menu>
            </View>
          );
        })}
      </View>
      <Pressable onPress={() => setVisibleModal(true)}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            marginTop: 10,
            marginLeft: 10,
            color: PRIMARY_COLOR
          }}
        >
          Add admin
        </Text>
      </Pressable>
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 10
            }}
          >
            Add admin
          </Text>
          <TextInput
            value={adminEmail}
            onChangeText={setAdminEmail}
            mode="outlined"
            label="Admin email"
            outlineColor="black"
            style={{ backgroundColor: "white" }}
          />
          <TouchableOpacity
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
    </View>
  );
};

export default ManageGroupAdmins;
