import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { getManagedGroups } from "../../api/apis";
import { PRIMARY_COLOR } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const ManageGroups = () => {
  const [managedGroups, setManagedGroups] = useState([]);
  useEffect(() => {
    const fetchManagedGroups = async () => {
      const email = await SecureStorage.getItemAsync("email");
      getManagedGroups(email).then((response) => {
        setManagedGroups(response);
      });
    };
    fetchManagedGroups();
  }, []);

  const navigator = useNavigation();
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Groups you manage
          </Text>
          {managedGroups?.map((item, index) => {
            return (
              <View style={{ marginTop: 10, marginHorizontal: 10 }} key={index}>
                <Pressable
                  onPress={() =>
                    navigator.navigate("GroupAdminPage", {
                      groupId: item?._id
                    })
                  }
                  style={{
                    backgroundColor: "white",
                    elevation: 1,
                    borderRadius: 20,
                    marginVertical: 10
                  }}
                >
                  <View
                    style={{ width: "100%", height: 100, position: "relative" }}
                  >
                    <Image
                      source={{
                        uri: item.groupCoverImage
                          ? item.groupCoverImage
                          : "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                      }}
                    />
                    <View
                      style={{
                        width: 90,
                        height: 90,
                        borderColor: "white",
                        borderWidth: 2,
                        borderRadius: 20,
                        position: "absolute",
                        backgroundColor: "#eeeeee",
                        bottom: -40,
                        left: 20
                      }}
                    >
                      <Image
                        source={{
                          uri: item.groupImage
                            ? item.groupImage
                            : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
                  <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                    <View
                      style={{
                        // marginVertical: 10,
                        justifyContent: "flex-end",
                        flexDirection: "row"
                      }}
                    ></View>
                    <View
                      style={{
                        marginTop: 30
                      }}
                    >
                      <Text style={{ fontWeight: "500", fontSize: 18 }}>
                        {item.groupName}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          marginBottom: 5,
                          color: "#A9A9A9",
                          fontWeight: "500"
                        }}
                      >
                        {item.groupMembers.length} members
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        {item.groupTags.map((item, index) => {
                          return (
                            <Text style={{ color: PRIMARY_COLOR }} key={index}>
                              {item},{" "}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageGroups;
