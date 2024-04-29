import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { getShortProfileInfo } from "../api/apis";

const GroupDetails = () => {
  const route = useRoute();
  const { groupDesc, groupDetails, groupRules, groupMembers, groupAdmins } =
    route.params;
  // console.log(groupAdmins);
  const [groupAdminData, setGroupAdminData] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupDescLength, setGroupDescLength] = useState(
    groupDesc.length > 500
  );
  const [groupRulesLength, setGroupRulesLength] = useState(
    groupRules.length > 500
  );

  const getUserData = async (admin) => {
    console.log(admin);
    const adminData = await getShortProfileInfo(admin.adminData.email);
    return {
      adminData: adminData.data,
      role: admin.role
    };
  };

  const getGroupUsers = async () => {
    const users = await Promise.all(
      groupMembers.slice(0, 5).map(async (member) => {
        const userInfo = await getShortProfileInfo(member.user);
        return userInfo?.data.profilePicture;
      })
    );
    setGroupUsers(users);
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await Promise.all(groupAdmins.map(getUserData));
      setGroupAdminData(adminData);
    };
    fetchAdminData();
  }, [groupAdmins]);
  useEffect(() => {
    getGroupUsers();
  }, [groupMembers]);
  return (
    <View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
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
          <Text style={{ marginBottom: 5 }}>
            {groupDescLength ? groupDesc.substring(0, 500) + "..." : groupDesc}
          </Text>
          {groupDescLength ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5
              }}
              onPress={() => {
                setGroupDescLength(!groupDescLength);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  color: "#39A7FF",
                  fontWeight: "500",
                  fontSize: 16
                  // justifyContent: "center"
                }}
              >
                Show more
              </Text>
              <AntDesign name="down" size={16} color="#39A7FF" style={{}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5
              }}
              onPress={() => {
                setGroupDescLength(!groupDescLength);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  color: "#39A7FF",
                  fontWeight: "500",
                  fontSize: 16
                  // justifyContent: "center"
                }}
              >
                Show less
              </Text>
              <AntDesign name="up" size={16} color="#39A7FF" style={{}} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#fff",
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
            Details
          </Text>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Genra
            </Text>
            <Text>
              {groupDetails?.groupGenre?.length > 0
                ? groupDetails?.groupGenre.join(", ")
                : "No genre"}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Location
            </Text>
            <Text>{groupDetails?.groupLocation}</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Visibiliy
            </Text>
            <Text>{groupDetails?.groupVisibility}</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#39A7FF",
                marginVertical: 5
              }}
            >
              Created On
            </Text>
            <Text>{new Date(groupDetails?.createdOn).toDateString()}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
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
            Rules
          </Text>
          <Text style={{}}>
            {groupRulesLength
              ? groupRules.substring(0, 500) + "..."
              : groupRules}
          </Text>
          {groupRulesLength ? (
            <TouchableOpacity
              onPress={() => {
                setGroupRulesLength(!groupDescLength);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  color: "#39A7FF",
                  fontWeight: "500",
                  fontSize: 16
                  // justifyContent: "center"
                }}
              >
                Show more
              </Text>
              <AntDesign name="down" size={16} color="#39A7FF" style={{}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setGroupRulesLength(groupDescLength);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  color: "#39A7FF",
                  fontWeight: "500",
                  fontSize: 16
                  // justifyContent: "center"
                }}
              >
                Show less
              </Text>
              <AntDesign name="up" size={16} color="#39A7FF" style={{}} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#fff",
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
            Members
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginBottom: 10
            }}
          >
            {groupUsers?.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: item
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    resizeMode: "cover",
                    borderColor: "#39A7FF",
                    borderWidth: 1
                  }}
                />
              );
            })}
            <View
              style={{
                // backgroundColor: "#39A7FF",
                width: 40,
                height: 40,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#39A7FF",
                borderWidth: 2
              }}
            >
              <Text>+1K</Text>
            </View>
          </View>
          <Pressable
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#39A7FF",
                fontWeight: "500"
              }}
            >
              Show all members
            </Text>
            <AntDesign
              name="arrowright"
              size={16}
              color="#39A7FF"
              style={{ textAlign: "center" }}
            />
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
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
            {groupAdminData?.map((item, index) => {
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
                      uri: item?.adminData?.profilePicture
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 50,
                      resizeMode: "cover",
                      borderColor: "#39A7FF",
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
                          {item?.adminData?.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "500",
                            //   fontSize: 16,
                            backgroundColor: "#DDE6ED",
                            borderRadius: 10,
                            paddingHorizontal: 5,
                            color: "#39A7FF"
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
                        {item?.adminData?.header}
                      </Text>
                    </View>
                    <Pressable>
                      <Text
                        style={{
                          color: "#39A7FF",
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
      </ScrollView>
    </View>
  );
};

export default GroupDetails;
