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
import { getSpecificGroup } from "../api/apis";
import * as SecureStorage from "expo-secure-store";
import GroupPostCard from "../components/GroupPostCard";

const ViewGroupInfo = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  const [groupInfo, setGroupInfo] = useState({});
  const [groupJoin, setGroupJoin] = useState(false);
  useEffect(() => {
    // console.log(groupId);
    const fetchGroupInfo = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const response = await getSpecificGroup(groupId);
      // console.log(response);
      setGroupInfo(response);
      if (response?.groupMembers?.find((item) => item.user === email)) {
        setGroupJoin(true);
        console.log("joined");
      } else {
        console.log("not joined");
      }
    };
    fetchGroupInfo();
  }, []);
  const groupPosts = [
    {
      id: 1,
      user: "John Doe",
      header: "Group Post",
      profilePicture:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      description: "This is a group post",
      image:
        "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      likes: ["John Doe", "Jane Doe"],
      groupProfile:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      comments: [],
      groupName: "Group Name"
    }
  ];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
          <View
            style={{
              paddingBottom: 45
            }}
          >
            <View
              style={{
                height: 110,
                backgroundColor: "gray"

                // zIndex: 1
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
                  <Feather name="settings" size={22} color="#49755D" />
                </Pressable>
                <Feather name="bell" size={22} color="#49755D" />
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
                  borderColor: "#49755D",
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
                style={{
                  flex: 1,
                  padding: 8,
                  borderWidth: groupJoin ? 2 : 0,
                  borderColor: groupJoin ? "#49755D" : "white",
                  backgroundColor: groupJoin ? "white" : "#49755D",
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
                    color: groupJoin ? "#49755D" : "white"
                  }}
                >
                  {groupJoin ? "Exit" : "Join"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderColor: "#49755D",
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // marginTop: 5,
                    fontWeight: "500",
                    color: "#49755D"
                  }}
                >
                  Invite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#49755D",
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color="#49755D"
                />
              </TouchableOpacity>
            </View>
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
                groupAdmins: groupInfo?.groupAdmins
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                color: "#49755D",
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
            backgroundColor: "#fff",
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 10
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 50
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 50
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigator.navigate("Add Post", { visibility: "group" })
            }
            style={{
              flex: 1
            }}
          >
            {/* <TextInput
              style={{
                // width: "100%",
                flex: 1,
                height: 40,
                backgroundColor: "#F5F5F5",
                borderRadius: 50,
                paddingHorizontal: 20
              }}
              placeholder="Post something here..."
            /> */}
            <View
              style={{
                flex: 1,
                height: 40,
                backgroundColor: "#F5F5F5",
                borderRadius: 50,
                paddingHorizontal: 20,
                justifyContent: "center"
              }}
            >
              <Text style={{}}>Post something here...</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
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
              backgroundColor: "#fff",
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
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingHorizontal: 10
          }}
        >
          {groupPosts.map((item) => {
            return (
              <GroupPostCard
                key={item.id}
                user={item.user}
                header={item.header}
                profilePicture={item.profilePicture}
                description={item.description}
                image={item.image}
                likes={item.likes}
                groupProfile={item.groupProfile}
                groupName={item.groupName}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewGroupInfo;
