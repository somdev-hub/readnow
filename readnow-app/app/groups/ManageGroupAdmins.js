import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import { Menu, Modal, Portal, TextInput, Snackbar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import {
  addGroupAdmin,
  getShortProfileInfo,
  getSpecificGroup,
  removeGroupAdmin
} from "../../api/apis";
import { Picker } from "@react-native-picker/picker";
import { RefreshControl } from "react-native";

const ManageGroupAdmins = () => {
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const route = useRoute();
  const { groupId } = route.params;
  const [visibleModal, setVisibleModal] = useState(false);
  const [adminData, setAdminData] = useState({
    adminEmail: "",
    adminRole: ""
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [groupAdmins, setGroupAdmins] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    message: ""
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    getGroupData();
  }, []);

  const addAdmin = async () => {
    const response = await addGroupAdmin(groupId, adminEmail, adminRole);
    if (response?.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Admin added successfully"
      });
    } else {
      setSnackbarVisible({
        visible: true,
        message: "Error adding admin"
      });
    }
  };

  const removeAdmin = async (adminMail) => {
    const response = await removeGroupAdmin(groupId, adminMail);
    if (response?.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Admin removed successfully"
      });
    } else {
      setSnackbarVisible({
        visible: true,
        message: "Error removing admin"
      });
    }
  };

  const getGroupData = async () => {
    setRefreshing(true);
    const response = await getSpecificGroup(groupId);

    const groupAdminsData = await Promise.all(
      response?.groupAdmins?.map(async (admin) => {
        const response = await getShortProfileInfo(admin.user);
        return { adminData: response.data, adminRole: admin.role };
      })
    );
    setGroupAdmins(groupAdminsData);
    setRefreshing(false);
  };
  useEffect(() => {
    getGroupData();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */}
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
        {groupAdmins?.map((admin, index) => {
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
                    uri: admin.adminData?.profilePicture
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {admin.adminData?.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#A9A9A9" }}>
                    {admin.adminRole}
                  </Text>
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
                  onPress={() => {
                    removeAdmin(admin.adminData.email);
                    setVisibleMenu({
                      visible: false,
                      index: null
                    });
                  }}
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
            activeOutlineColor={PRIMARY_COLOR}
          />
          <Picker
            selectedValue={adminRole}
            onValueChange={(itemValue) => setAdminRole(itemValue)}
            style={{
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 2
            }}
          >
            <Picker.Item label="Moderator" value="Moderator" />
            <Picker.Item label="Editor" value="Editor" />
            {/* <Picker.Item label="Role 3" value="role3" /> */}
          </Picker>
          <TouchableOpacity
            onPress={() => {
              addAdmin();
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
        visible={snackbarVisible.visible}
        onDismiss={() =>
          setSnackbarVisible({
            visible: false,
            message: ""
          })
        }
        style={{}}
      >
        {snackbarVisible.message}
      </Snackbar>
    </ScrollView>
  );
};

export default ManageGroupAdmins;
