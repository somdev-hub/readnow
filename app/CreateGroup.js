import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable
} from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmail } from "../redux/groupSlice";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const CreateGroup = () => {
  const ref = React.useRef(true);
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const groupData = useSelector((state) => state.group.groupData);
  const groupGenres = useSelector((state) => state.group.groupGenres);
  // console.log(groupGenres);
  const router = useRoute();
  const [groupCreationData, setGroupCreationData] = React.useState({
    groupName: "",
    groupDescription: "",
    groupAdmins: [],
    groupRules: "",
    groupTags: [],
    groupDetails: {
      groupLocation: "",
      groupVisibility: "private",
      groupGenre: groupGenres
    },
    groupImage: null,
    groupCoverImage: null
  });

  const selectImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      if (type === "groupImage") {
        setGroupCreationData({
          ...groupCreationData,
          groupImage: result.assets[0].uri
        });
      } else {
        setGroupCreationData({
          ...groupCreationData,
          groupCoverImage: result.assets[0].uri
        });
      }
    }
  };

  useEffect(() => {
    setGroupCreationData({
      ...groupCreationData,
      groupDetails: {
        ...groupCreationData.groupDetails,
        groupGenre: groupGenres
      }
    });
  }, [groupGenres]);

  useEffect(() => {
    dispatch({
      type: "group/updateGroupData",
      payload: { ...groupCreationData }
    });
    dispatch(fetchEmail());
  }, [groupCreationData]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingBottom: 20 }}>
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
              <Pressable
                onPress={() => {
                  selectImage("groupCoverImage");
                }}
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  elevation: 1,
                  zIndex: 1,
                  bottom: 10,
                  right: 10,
                  alignItems: "center"
                }}
              >
                <EvilIcons name="pencil" size={28} color="black" />
              </Pressable>
              <Image
                source={{
                  uri: groupCreationData.groupCoverImage
                    ? groupCreationData.groupCoverImage
                    : "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                }}
                style={{
                  width: "100%",
                  height: "100%",

                  position: "relative",
                  zIndex: 0
                }}
              />
              <View
                style={{
                  position: "absolute",
                  left: 20,
                  bottom: -40,
                  backgroundColor: "white",
                  width: 90,
                  height: 90,
                  zIndex: 5,
                  borderRadius: 20,
                  borderColor: "#49755D",
                  borderWidth: 1
                }}
              >
                <Pressable
                  onPress={() => {
                    selectImage("groupImage");
                  }}
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    elevation: 1,
                    zIndex: 1,
                    bottom: -10,
                    right: -10,
                    // justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <EvilIcons name="pencil" size={28} color="black" />
                </Pressable>
                <Image
                  source={{
                    uri: groupCreationData.groupImage
                      ? groupCreationData.groupImage
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
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20
          }}
        >
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Enter group name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Group Name"
              value={groupCreationData.groupName}
              onChangeText={(text) => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupName: text
                });
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Enter group description*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="About this group"
              value={groupCreationData.groupDescription}
              onChangeText={(text) => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupDescription: text
                });
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Group genre*
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10
              }}
            >
              {groupGenres.map((genre, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // borderColor: "#A9A9A9",
                      // borderWidth: 1,
                      borderRadius: 50,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      width: "auto",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // alignSelf: "flex-start",
                      gap: 5,
                      backgroundColor: "#49755D"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 14
                        // margin:0
                      }}
                    >
                      {genre}
                    </Text>
                    <Entypo
                      name="cross"
                      size={18}
                      color="white"
                      onPress={() => {
                        dispatch({
                          type: "group/updateGroupGenres",
                          payload: groupGenres.filter((i) => i !== genre)
                        });
                      }}
                    />
                  </View>
                );
              })}
              <Pressable
                onPress={() => navigator.navigate("GenreSelection")}
                style={{
                  borderColor: "#A9A9A9",
                  borderWidth: 1,
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  width: 130,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14
                  }}
                >
                  Add genre
                </Text>
                <Entypo name="plus" size={18} color="black" />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Enter location*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="location of your group"
              value={groupData.groupDetails.groupLocation}
              onChangeText={(text) => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupDetails: {
                    ...groupCreationData.groupDetails,
                    groupLocation: text
                  }
                });
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Enter rules*
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="rules of your group"
              value={groupCreationData.groupRules}
              onChangeText={(text) => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupRules: text
                });
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Enter tags
            </Text>
            <TextInput
              multiline={true}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="#tags of your group separated by comma"
              value={groupCreationData.groupTags.join(",")}
              onChangeText={(text) => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupTags: text.split(",")
                });
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10,
                color: "#49755D"
              }}
            >
              Group visibility*
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                marginRight: 10,
                width: "100%"
              }}
              onPress={() => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupDetails: {
                    ...groupCreationData.groupDetails,
                    groupVisibility: "private"
                  }
                });
              }}
            >
              <View style={{}}>
                <Text style={{ fontWeight: "500" }}>Private</Text>
                <Text
                  style={{
                    marginTop: 5,
                    width: 300
                  }}
                >
                  If set private, only members can see the group posts and
                  people
                </Text>
              </View>
              <RadioButton
                value={groupCreationData.groupDetails.groupVisibility}
                status={
                  groupCreationData.groupDetails.groupVisibility === "private"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  setGroupCreationData({
                    ...groupCreationData,
                    groupDetails: {
                      ...groupCreationData.groupDetails,
                      groupVisibility: "private"
                    }
                  });
                  // setChecked("private")
                }}
                color="#49755D"
                style={{ justifyContent: "center" }}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10
              }}
              onPress={() => {
                setGroupCreationData({
                  ...groupCreationData,
                  groupDetails: {
                    ...groupCreationData.groupDetails,
                    groupVisibility: "public"
                  }
                });
                // setChecked("private")
              }}
            >
              <View style={{}}>
                <Text style={{ fontWeight: "500" }}>Public</Text>
                <Text
                  style={{
                    marginTop: 5,
                    width: 300
                    // width:300
                  }}
                >
                  If set public, anyone can see the group posts and people
                </Text>
              </View>
              <RadioButton
                value={groupCreationData.groupDetails.groupVisibility}
                status={
                  groupCreationData.groupDetails.groupVisibility === "public"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  setGroupCreationData({
                    ...groupCreationData,
                    groupDetails: {
                      ...groupCreationData.groupDetails,
                      groupVisibility: "public"
                    }
                  });
                  // setChecked("private")
                }}
                color="#49755D"
                style={{
                  justifyContent: "center"
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateGroup;
