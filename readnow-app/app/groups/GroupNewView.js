import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { Chip } from "react-native-paper";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  exitThisGroup,
  getShortProfileInfo,
  getSpecificGroup,
  joinThisGroup
} from "../../api/apis";
import * as SecureStorage from "expo-secure-store";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";

const GroupNewView = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  const [groupInfo, setGroupInfo] = useState({});
  const [groupAdmins, setGroupAdmins] = useState([]);
  const [groupJoin, setGroupJoin] = useState(false);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const response = await getSpecificGroup(groupId);
      setGroupInfo(response);

      const adminInfos = [];
      for (const item of response?.groupAdmins) {
        const adminInfo = await getShortProfileInfo(item.user);
        adminInfos.push({
          adminData: adminInfo.data,
          role: item.role
        });
      }
      setGroupAdmins(adminInfos);

      const email = await SecureStorage.getItemAsync("email");
      if (response?.groupMembers?.find((item) => item.user === email)) {
        setGroupJoin(true);
        console.log("joined");
      } else {
        console.log("not joined");
      }
    };
    fetchGroupInfo();
  }, []);
  const joinGroupMethod = async () => {
    const email = await SecureStorage.getItemAsync("email");
    joinThisGroup(email, groupId).then((response) => {
      try {
        if (response.status === 200) {
          setGroupJoin(true);
        }
        console.log(response.data);
      } catch (error) {
        console.log(response.status);
        console.log(response.data);
      }
    });
  };
  const exitGroupMethod = async () => {
    const email = await SecureStorage.getItemAsync("email");
    exitThisGroup(email, groupId).then((response) => {
      try {
        if (response.status === 200) {
          console.log(response);
          setGroupJoin(false);
        }
        console.log(response.data);
      } catch (error) {
        console.log(response.status);
        console.log(response.data);
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: WHITE_COLOR, paddingBottom: 20 }}>
          <View
            style={{
              paddingBottom: 45
            }}
          >
            <View
              style={{
                height: 110,
                backgroundColor: "gray"
              }}
            >
              <Image
                source={{
                  uri: groupInfo?.groupCoverImage
                }}
                style={{
                  width: "100%",
                  height: "100%",

                  position: "relative",
                  zIndex: 1
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                  gap: 10
                }}
              >
                <Pressable onPress={() => navigator.navigate("GroupSettings")}>
                  <Feather name="settings" size={22} color={PRIMARY_COLOR} />
                </Pressable>
                <Feather name="bell" size={22} color={PRIMARY_COLOR} />
              </View>
              <View
                style={{
                  position: "absolute",
                  // top: 30,
                  left: 20,
                  // right: 10,
                  bottom: -40,
                  backgroundColor: "white",
                  width: 90,
                  height: 90,
                  zIndex: 5,
                  borderRadius: 20,
                  // elevation: 5,
                  borderColor: PRIMARY_COLOR,
                  borderWidth: 1
                }}
              >
                <Image
                  source={{
                    uri: groupInfo?.groupImage
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 20,
                marginTop: 10
              }}
            >
              {groupInfo?.groupName}
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontWeight: "500",
                fontSize: 16,
                color: "#A9A9A9"
              }}
            >
              {groupInfo?.groupMembers?.length} members |{" "}
              {groupInfo?.groupPosts?.length} posts
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                gap: 10,
                flex: 1
              }}
            >
              <TouchableOpacity
                onPress={groupJoin ? exitGroupMethod : joinGroupMethod}
                style={{
                  flex: 1,
                  padding: 8,
                  borderWidth: groupJoin ? 2 : 0,
                  borderColor: groupJoin ? PRIMARY_COLOR : "white",
                  backgroundColor: groupJoin ? "white" : PRIMARY_COLOR,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // marginTop: 5,
                    fontWeight: "500",
                    color: groupJoin ? PRIMARY_COLOR : "white"
                  }}
                >
                  {groupJoin ? "Exit" : "Join"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderColor: PRIMARY_COLOR,
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 7,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={PRIMARY_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: WHITE_COLOR,
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginVertical: 10
            }}
          >
            Description
          </Text>
          <Text style={{}}>{groupInfo?.groupDescription}</Text>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("GroupDetails", {
                groupDesc: groupInfo?.groupDescription,
                groupDetails: groupInfo?.groupDetails,
                groupRules: groupInfo?.groupRules,
                groupMembers: groupInfo?.groupMembers,
                groupAdmins: groupAdmins
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                color: PRIMARY_COLOR,
                fontWeight: "500",
                fontSize: 16
              }}
            >
              More details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: WHITE_COLOR,
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginVertical: 10
            }}
          >
            Admins
          </Text>
          <View>
            {groupAdmins?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                  <Image
                    source={{
                      uri: item?.adminData.profilePicture
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 50,
                      resizeMode: "cover",
                      borderColor: PRIMARY_COLOR,
                      borderWidth: 1
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#A9A9A9",
                      borderBottomWidth: 1,
                      paddingBottom: 10
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                          {item?.adminData.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "500",
                            //   fontSize: 16,
                            backgroundColor: "#DDE6ED",
                            borderRadius: 10,
                            paddingHorizontal: 5,
                            color: PRIMARY_COLOR
                          }}
                        >
                          {item?.role}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#A9A9A9",
                          fontWeight: "500",
                          fontSize: 14,
                          marginTop: 3
                        }}
                      >
                        {item?.adminData.header}
                      </Text>
                    </View>
                    <Pressable>
                      <Text
                        style={{
                          color: PRIMARY_COLOR,
                          fontWeight: "500",
                          fontSize: 14,
                          marginTop: 3,
                          marginRight: 10
                        }}
                      >
                        follow
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            backgroundColor: WHITE_COLOR,
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              // paddingHorizontal: 15,
              alignItems: "center",
              paddingVertical: 10,
              gap: 10,
              backgroundColor: WHITE_COLOR,
              elevation: 1
            }}
          >
            <Chip
              // selected={selectedValue === "News"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("News")}
            >
              News
            </Chip>
            <Chip
              // selected={selectedValue === "Posts"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("Posts")}
            >
              Posts
            </Chip>
            <Chip
              // selected={selectedValue === "Stories"}
              showSelectedCheck
              style={{
                backgroundColor: "transparent"
              }}
              mode="outlined"
              // onPress={() => setSelectedValue("Stories")}
            >
              Stories
            </Chip>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupNewView;
