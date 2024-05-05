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
  getGroupFeed,
  getShortGroupInfo,
  getShortProfileInfo,
  getSpecificGroup
} from "../../api/apis";
import * as SecureStorage from "expo-secure-store";
import GroupPostCard from "../../components/GroupPostCard";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";

const GroupAdminPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  const [groupInfo, setGroupInfo] = useState({});
  const [groupPosts, setGroupPosts] = useState([]);
  const fetchGroupPosts = async () => {
    const response = await getGroupFeed(groupId);
    const postsWithUserAndGroup = await Promise.all(
      response.posts.map(async (post) => {
        const userProfile = await getShortProfileInfo(post.postedBy);
        const groupDetails = await getShortGroupInfo(post.group);
        return { ...post, userProfile: userProfile.data, groupDetails };
      })
    );
    setGroupPosts(postsWithUserAndGroup);
  };
  useEffect(() => {
    const fetchGroupInfo = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const response = await getSpecificGroup(groupId);

      setGroupInfo(response);
    };
    fetchGroupInfo();
    fetchGroupPosts();
  }, []);

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
                <Pressable
                  onPress={() =>
                    navigator.navigate("GroupSettings", {
                      groupId: groupId
                    })
                  }
                >
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
                style={{
                  flex: 1,
                  //   borderColor: PRIMARY_COLOR,
                  //   borderWidth: 2,
                  borderRadius: 50,
                  padding: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: PRIMARY_COLOR
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    // marginTop: 5,
                    fontWeight: "500",
                    color: WHITE_COLOR
                  }}
                >
                  Invite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: PRIMARY_COLOR,
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
                groupAdmins: groupInfo?.groupAdmins
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
        <View>
          {groupPosts?.map((item) => {
            return (
              <GroupPostCard
                key={item?.id}
                user={item?.userProfile?.name}
                header={item?.userProfile?.header}
                profilePicture={item?.userProfile?.profilePicture}
                description={item?.description}
                image={item?.image}
                likes={item?.likedBy}
                postId={item?.id}
                comments={item?.comments}
                groupProfile={item?.groupDetails?.groupImage}
                groupName={item?.groupDetails?.groupName}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupAdminPage;
