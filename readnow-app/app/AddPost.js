import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as SecureStorage from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
// import { fetchEmail } from "../redux/postSlice";
import {
  FAB,
  Surface,
  ActivityIndicator,
  Modal,
  Portal,
  RadioButton,
  Dialog
} from "react-native-paper";
import { getAIResponse, getFollowedGroups, getUserGroups } from "../api/apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../styles/colors";
import { pickImage } from "../services/PickImage";

const screenHeights = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Option = ({
  icon,
  text,
  subText,
  checked,
  onCheck,
  groupSelection = false,
  groupImage
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <View
      style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}
    >
      {!groupSelection && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eeeeee",
            width: 50,
            height: 50,
            borderRadius: 50
          }}
        >
          {icon}
        </View>
      )}
      {groupSelection && (
        <Image
          style={{
            backgroundColor: "#eeeeee",
            width: 50,
            height: 50,
            borderRadius: 50
          }}
          source={{
            uri: groupImage
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "500", fontSize: 16 }}>{text}</Text>
        {subText && <Text>{subText}</Text>}
      </View>
    </View>
    <RadioButton status={checked ? "checked" : "unchecked"} onPress={onCheck} />
  </View>
);

const AddPost = () => {
  const route = useRoute();
  const { visibility } = route.params;
  const [postImage, setPostImage] = useState(null);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    description: "",
    postedBy: "",
    image: ""
  });
  const [surfaceVisible, setSurfaceVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const postVisibilityModal = useSelector(
    (state) => state.post.selectVisibility
  );
  const [groupSelectionModal, setGroupSelectionModal] = useState(false);
  const postVisibility = useSelector((state) => state.post.postVisibility);
  const [userGroups, setUserGroups] = useState([]); // ["React Native Developers", "Plant Lovers"
  // const [selectedGroup, setSelectedGroup] = useState("");
  const alertModel = useSelector((state) => state.post.alertModel);
  const selectedGroup = useSelector((state) => state.post.selectedGroup);

  // console.log(userGroups);

  const firstRender = useRef(true);

  const hideModal = () => {
    dispatch({
      type: "post/updatePostVisibility",
      payload: false
    });
  };

  const aiPromptHandler = (text) => {
    setAiPrompt(text);
  };
  const handleAI = async () => {
    setIsAILoading(true);
    const response = await getAIResponse(aiPrompt);

    if (response) {
      setPostData({
        ...postData,
        description: response?.data
      });
    }
    setIsAILoading(false);
    setSurfaceVisible(false);
  };

  const selectImage = async () => {
    const imageUri = await pickImage();
    setPostImage(imageUri);
    dispatch({
      type: "post/updatePostData",
      payload: {
        image: imageUri,
        postedBy: postData.postedBy,
        description: postData.description
      }
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      dispatch({
        type: "post/updatePostData",
        payload: {
          description: "",
          postedBy: "",
          image: null
        }
      });
    }

    const getEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const groups = await getFollowedGroups(email);
      setUserGroups(groups);
      setPostData({
        ...postData,
        postedBy: email
      });
    };

    getEmail();

    dispatch({
      type: "post/updatePostVisibilityOption",
      payload: visibility ? visibility : "anyone"
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "post/updatePostData",
      payload: postData
    });
  }, [postData]);

  return (
    <View>
      <View
        style={{
          position: "relative",
          backgroundColor: "white",
          marginTop: 10,
          height: screenHeights * 0.8
        }}
      >
        <ScrollView>
          <TextInput
            multiline
            textAlignVertical="top"
            placeholder="Enter your thoughts..."
            style={{ fontSize: 16, height: "100%", padding: 10 }}
            onChangeText={(text) =>
              setPostData({
                description: text,
                postedBy: postData.postedBy,
                image: postData.image
              })
            }
            value={postData.description}
          />
        </ScrollView>
        {postImage && (
          <View
            style={{
              height: 75,
              width: "100%",
              position: "fixed",
              bottom: 0,
              backgroundColor: WHITE_COLOR,
              padding: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10
            }}
          >
            <View style={{ position: "relative", width: 60 }}>
              <Image
                source={{
                  uri: postImage
                }}
                style={{
                  width: "100%",
                  height: 60,
                  borderRadius: 10
                }}
              />
              <Pressable
                onPress={() => {
                  setPostImage(null);
                  dispatch({
                    type: "post/updatePostData",
                    payload: {
                      image: null,
                      postedBy: postData.postedBy,
                      description: postData.description
                    }
                  });
                }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  position: "absolute",
                  top: -3,
                  // right: 10,
                  right: -5,
                  backgroundColor: WHITE_COLOR,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 3
                }}
              >
                <Entypo name="cross" size={18} color="black" />
              </Pressable>
            </View>
          </View>
        )}
        {surfaceVisible && (
          <Surface
            style={{
              padding: 3,
              paddingHorizontal: 10,
              backgroundColor: WHITE_COLOR,
              height: 350,
              width: screenWidth * 0.9,
              alignSelf: "center",
              position: "absolute",
              bottom: 100,
              borderRadius: 10
            }}
            elevation={1}
          >
            <TextInput
              multiline
              textAlignVertical="top"
              style={{
                fontSize: 14,
                height: "85%",
                padding: 10,
                textAlignVertical: "top"
              }}
              onChangeText={(text) => aiPromptHandler(text)}
              placeholder="Enter prompt to generate text..."
            />
            <TouchableOpacity
              onPress={handleAI}
              style={{
                padding: 10,
                backgroundColor: "#6C3428",
                borderRadius: 10
              }}
            >
              {isAILoading ? (
                <ActivityIndicator animating={true} color={WHITE_COLOR} />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: WHITE_COLOR,
                    fontWeight: "500"
                  }}
                >
                  Generate
                </Text>
              )}
            </TouchableOpacity>
          </Surface>
        )}
        <FAB
          icon="plus"
          color={WHITE_COLOR}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: PRIMARY_COLOR,
            color: WHITE_COLOR
          }}
          onPress={() => setSurfaceVisible(!surfaceVisible)}
        />
      </View>
      <View
        style={{
          //   elevation: 1,
          backgroundColor: "white",
          marginTop: 10,
          padding: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          gap: 10,
          height: screenHeights * 0.1
          //   height: 100
        }}
      >
        <Pressable onPress={selectImage}>
          <FontAwesome5 name="image" size={24} color="#A9A9A9" />
        </Pressable>
        <MaterialCommunityIcons name="file-pdf-box" size={24} color="#a9a9a9" />
      </View>
      <Portal>
        <Modal
          visible={postVisibilityModal}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: screenWidth * 0.9,
            alignSelf: "center"
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 30 }}>
            Who can see your post?
          </Text>
          <View style={{ flexDirection: "column", gap: 20 }}>
            <Option
              icon={<Entypo name="globe" size={24} color="black" />}
              text="Anyone"
              subText="Anyone on ReadNow"
              checked={postVisibility.anyone}
              onCheck={() => {
                dispatch({
                  type: "post/updatePostVisibilityOption",
                  payload: "anyone"
                });
                dispatch({
                  type: "post/updatePostVisibility",
                  payload: false
                });
              }}
            />
            <Option
              icon={<MaterialIcons name="group" size={24} color="black" />}
              text="Followers only"
              checked={postVisibility.followersOnly}
              onCheck={() => {
                dispatch({
                  type: "post/updatePostVisibilityOption",
                  payload: "followersOnly"
                });
                dispatch({
                  type: "post/updatePostVisibility",
                  payload: false
                });
              }}
            />
            <Option
              icon={<MaterialIcons name="groups" size={24} color="black" />}
              text="Groups"
              checked={postVisibility.groups}
              onCheck={() => {
                dispatch({
                  type: "post/updatePostVisibilityOption",
                  payload: "groups"
                });
                dispatch({
                  type: "post/updatePostVisibility",
                  payload: false
                });
                setGroupSelectionModal(true);
              }}
            />
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={groupSelectionModal}
          onDismiss={() => setGroupSelectionModal(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: screenWidth * 0.9,
            alignSelf: "center"
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 30 }}>
            Select the group
          </Text>
          <View style={{ flexDirection: "column", gap: 20 }}>
            {userGroups?.length === 0 && (
              <Text style={{ textAlign: "center" }}>
                You are not a member of any group
              </Text>
            )}
            {userGroups?.map((group, index) => {
              return (
                <Option
                  key={index}
                  groupImage={group.groupImage}
                  text={group.groupName}
                  checked={selectedGroup === group.groupName}
                  onCheck={() => {
                    dispatch({
                      type: "post/updateSelectedGroup",
                      payload: group._id
                    });
                    dispatch({
                      type: "post/updatePostVisibility",
                      payload: false
                    });
                    setGroupSelectionModal(false);
                  }}
                  groupSelection={true}
                />
              );
            })}
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Dialog
          visible={alertModel.visible}
          onDismiss={() =>
            dispatch({
              type: "post/updateAlertModel",
              payload: {
                visible: false,
                title: "",
                message: ""
              }
            })
          }
          style={{
            backgroundColor: "white"
          }}
        >
          <Dialog.Title>{alertModel.title}</Dialog.Title>
          <Dialog.Content>
            <Text>{alertModel.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() =>
                dispatch({
                  type: "post/updateAlertModel",
                  payload: {
                    visible: false,
                    title: "",
                    message: ""
                  }
                })
              }
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: PRIMARY_COLOR
                }}
              >
                Ok
              </Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddPost;
