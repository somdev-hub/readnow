import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { EvilIcons, AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStorage from "expo-secure-store";
import { Snackbar } from "react-native-paper";

const CreatePublisher = () => {
  const [publisherData, setPublisherData] = useState({
    publisherManager: "",
    publisherName: "",
    publisherCategory: "",
    publisherTags: [],
    editorEmails: [],
    publisherSocials: {
      twitter: "",
      facebook: "",
      instagram: "",
      website: ""
    },
    publisherDescription: "",
    publisherImage: "",
    publisherCoverImage: ""
  });
  const dispatch = useDispatch();
  const [editorEmail, setEditorEmail] = useState("");
  const publisherSnackbar = useSelector(
    (state) => state.publisher.publisherSnackbar
  );
  const publisherSnackbarMessage = useSelector(
    (state) => state.publisher.publisherSnackbarMessage
  );
  const selectImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      if (type === "publisherCoverImage") {
        setPublisherData({
          ...publisherData,
          publisherCoverImage: result.assets[0].uri
        });
      } else {
        setPublisherData({
          ...publisherData,
          publisherImage: result.assets[0].uri
        });
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "publisher/updatePublisherData",
      payload: publisherData
    });
  }, [publisherData]);

  useEffect(() => {
    const getEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      setPublisherData({
        ...publisherData,
        publisherManager: email
      });
    };
    getEmail();
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}
    >
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
                  selectImage("publisherCoverImage");
                }}
                style={{
                  position: "absolute",
                  backgroundColor: PRIMARY_COLOR,
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
                <EvilIcons name="pencil" size={28} color="white" />
              </Pressable>
              <Image
                source={{
                  uri: publisherData.publisherCoverImage
                    ? publisherData.publisherCoverImage
                    : "https://www.desktopbackground.org/download/1920x1080/2015/01/14/886856_dark-grey-red-material-design-4k-wallpapers_3840x2160_h.jpg"
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
                  borderRadius: 0,
                  borderColor: WHITE_COLOR,
                  borderWidth: 2
                }}
              >
                <Pressable
                  onPress={() => {
                    selectImage("publisherImage");
                  }}
                  style={{
                    position: "absolute",
                    backgroundColor: PRIMARY_COLOR,
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
                  <EvilIcons name="pencil" size={28} color="white" />
                </Pressable>
                <Image
                  source={{
                    uri: publisherData.publisherImage
                      ? publisherData.publisherImage
                      : "https://i.pinimg.com/564x/a7/5a/e4/a75ae4a186483cb9965e00bc5007f7ff.jpg"
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover"
                    // borderRadius: 20
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 20
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
              }}
            >
              Enter publisher name*
            </Text>
            <TextInput
              name="publisherName"
              value={publisherData.publisherName}
              onChangeText={(value) =>
                setPublisherData({ ...publisherData, publisherName: value })
              }
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher Name"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Select publisher category*
            </Text>
            <TextInput
              name="publisherCategory"
              value={publisherData.publisherCategory}
              onChangeText={(value) =>
                setPublisherData({ ...publisherData, publisherCategory: value })
              }
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher category"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
                // color: PRIMARY_COLOR
              }}
            >
              Select publisher tags*
            </Text>
            <TextInput
              name="publisherTags"
              value={publisherData.publisherTags.join(",")}
              onChangeText={(value) => {
                setPublisherData({
                  ...publisherData,
                  publisherTags: value.split(",")
                });
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher tags seperated by commas"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
              }}
            >
              Enter editors emails*
            </Text>
            <TextInput
              name="editorEmails"
              value={editorEmail}
              onChangeText={(value) => setEditorEmail(value)}
              onSubmitEditing={() => {
                setPublisherData({
                  ...publisherData,
                  editorEmails: [...publisherData.editorEmails, editorEmail]
                });
                setEditorEmail("");
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Type editor email and press enter"
            />
            {publisherData.editorEmails.length > 0 && (
              <View>
                {publisherData.editorEmails.map((email, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        borderWidth: 2,
                        borderColor: PRIMARY_COLOR,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5
                      }}
                    >
                      <Text
                        style={{
                          color: PRIMARY_COLOR
                        }}
                      >
                        {email}
                      </Text>
                      <Pressable
                        onPress={() => {
                          const newEmails = publisherData.editorEmails.filter(
                            (editorEmail, i) => i !== index
                          );
                          setPublisherData({
                            ...publisherData,
                            editorEmails: newEmails
                          });
                        }}
                      >
                        <Entypo name="cross" size={24} color={PRIMARY_COLOR} />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
              }}
            >
              Enter publisher socials
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                flex: 1
              }}
            >
              <View>
                <AntDesign name="twitter" size={20} color="black" />
              </View>
              <TextInput
                name="twitter"
                value={publisherData.publisherSocials.twitter}
                onChangeText={(value) => {
                  setPublisherData({
                    ...publisherData,
                    publisherSocials: {
                      ...publisherData.publisherSocials,
                      twitter: value
                    }
                  });
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10,
                  flex: 1
                }}
                placeholder="Twitter Handle"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                flex: 1
              }}
            >
              <View>
                <AntDesign name="facebook-square" size={20} color="black" />
              </View>
              <TextInput
                name="facebook"
                value={publisherData.publisherSocials.facebook}
                onChangeText={(value) => {
                  setPublisherData({
                    ...publisherData,
                    publisherSocials: {
                      ...publisherData.publisherSocials,
                      facebook: value
                    }
                  });
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10,
                  flex: 1
                }}
                placeholder="Facebook Handle"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                flex: 1
              }}
            >
              <View>
                <AntDesign name="instagram" size={20} color="black" />
              </View>
              <TextInput
                name="instagram"
                value={publisherData.publisherSocials.instagram}
                onChangeText={(value) => {
                  setPublisherData({
                    ...publisherData,
                    publisherSocials: {
                      ...publisherData.publisherSocials,
                      instagram: value
                    }
                  });
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10,
                  flex: 1
                }}
                placeholder="Instagram Handle"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                flex: 1
              }}
            >
              <View>
                <AntDesign name="link" size={20} color="black" />
              </View>
              <TextInput
                name="website"
                value={publisherData.publisherSocials.website}
                onChangeText={(value) => {
                  setPublisherData({
                    ...publisherData,
                    publisherSocials: {
                      ...publisherData.publisherSocials,
                      website: value
                    }
                  });
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  paddingBottom: 5,
                  marginBottom: 10,
                  flex: 1
                }}
                placeholder="Website URL"
              />
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 10
              }}
            >
              Enter publisher description*
            </Text>
            <TextInput
              name="publisherDescription"
              value={publisherData.publisherDescription}
              onChangeText={(value) =>
                setPublisherData({
                  ...publisherData,
                  publisherDescription: value
                })
              }
              multiline
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 5,
                marginBottom: 10
              }}
              placeholder="Publisher description"
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={publisherSnackbar}
        onDismiss={() => {
          dispatch({
            type: "publisher/updateSnackbarVisibility",
            payload: false
          });
        }}
      >
        {publisherSnackbarMessage}
      </Snackbar>
    </View>
  );
};

export default CreatePublisher;
