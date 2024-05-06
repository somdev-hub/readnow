import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../styles/colors";
import {
  Menu,
  Portal,
  Searchbar,
  Snackbar,
  Dialog,
  RadioButton
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  addGroupAdmin,
  getShortProfileInfo,
  getSpecificGroup,
  removeGroupMember
} from "../../api/apis";

const ManageGroupMembers = () => {
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const route = useRoute();
  const { groupId } = route.params;
  const [groupMembersData, setGroupMembersData] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    message: ""
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getGroupMembers();
  }, []);
  const [addAsAdminData, setAddAsAdminData] = useState({
    // visible: false,
    memberEmail: "",
    adminRole: ""
  });
  const [adminRoleDialogVisible, setAdminRoleDialogVisible] = useState(false);

  const getGroupMembers = async () => {
    setRefreshing(true);
    const response = await getSpecificGroup(groupId);
    const groupMembersData = await Promise.all(
      response?.groupMembers?.map(async (member) => {
        const response = await getShortProfileInfo(member.user);
        return response.data;
      })
    );

    setGroupMembersData(groupMembersData);
    setRefreshing(false);
  };

  const removeMember = async (memberEmail) => {
    const response = await removeGroupMember(groupId, memberEmail);
    if (response?.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Member removed successfully"
      });
    } else {
      setSnackbarVisible({
        visible: true,
        message: "Error removing member"
      });
    }
  };

  const addAsAdmin = async () => {
    const response = await addGroupAdmin(
      groupId,
      addAsAdminData.memberEmail,
      addAsAdminData.adminRole
    );
    if (response?.status === 200) {
      setSnackbarVisible({
        visible: true,
        message: "Member added as admin"
      });
    } else {
      setSnackbarVisible({
        visible: true,
        message: "Error adding as admin"
      });
    }
  };

  useEffect(() => {
    getGroupMembers();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        {groupMembersData?.map((member, index) => {
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
                    uri: member.profilePicture
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {member.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#A9A9A9" }}>
                    {member.header}
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
                    setAdminRoleDialogVisible(true);
                    setAddAsAdminData((prevState) => ({
                      ...prevState,
                      memberEmail: member.email
                    }));
                    setVisibleMenu({
                      visible: false,
                      index: null
                    });
                  }}
                  title="Make admin"
                  leadingIcon="star"
                />
                <Menu.Item
                  onPress={() => {
                    removeMember(member.email);
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
      <Portal>
        <Dialog
          visible={adminRoleDialogVisible}
          onDismiss={() => {
            setAdminRoleDialogVisible((prevState) => !prevState);
            setAddAsAdminData((prevState) => ({
              ...prevState,
              memberEmail: "",
              adminRole: ""
            }));
          }}
          style={{
            backgroundColor: "white"
          }}
        >
          <Dialog.Title>Choose admin role</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) =>
                setAddAsAdminData({ ...addAsAdminData, adminRole: value })
              }
              value={addAsAdminData.adminRole}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <RadioButton value="Editor" />
                <Text
                  style={{
                    fontWeight: "500"
                  }}
                >
                  Editor
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <RadioButton value="Moderator" />
                <Text
                  style={{
                    fontWeight: "500"
                  }}
                >
                  Moderator
                </Text>
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              gap: 10
            }}
          >
            <Pressable>
              <Text
                style={{
                  fontWeight: "500"
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                addAsAdmin();
                setAdminRoleDialogVisible(false);
                setAddAsAdminData((prevState) => ({
                  ...prevState,
                  memberEmail: "",
                  adminRole: ""
                }));
              }}
            >
              <Text
                style={{
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
        onDismiss={() => setSnackbarVisible({ visible: false, message: "" })}
      >
        {snackbarVisible.message}
      </Snackbar>
    </ScrollView>
  );
};

export default ManageGroupMembers;
