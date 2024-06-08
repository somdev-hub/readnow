import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { editProfile, getProfile, signup } from "../../api/apis";
import * as SecureStorage from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../../services/PickImage";

const AddInfo = () => {
  const route = useRoute();
  const { userCredentials } = route.params;
  const [userData, setUserData] = useState({
    email: userCredentials.email,
    name: "",
    header: "",
    tags: [],
    description: "",
    profilePicture: "",
    backgroundPicture: "",
    isProfilePictureSame: true,
    isBackgroundPictureSame: true
  });
  const setFormData = (key, value) => {
    if (key === "tags") {
      value = value.split(",");
    }
    setUserData({ ...userData, [key]: value });
  };

  const selectImage = async (type) => {
    let result = await pickImage();
    if (result) {
      if (type === "backgroundPicture") {
        setUserData({
          ...userData,
          isBackgroundPictureSame: true,
          backgroundPicture: result,
          isBackgroundPictureSame: false
        });
      } else {
        setUserData({
          ...userData,
          isProfilePictureSame: true,
          profilePicture: result,
          isProfilePictureSame: false
        });
      }
    }
  };

  // const selectImage = async (type) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images
  //   });

  //   if (!result.canceled) {
  //     if (type === "backgroundPicture") {
  //       setUserData({
  //         ...userData,
  //         isBackgroundPictureSame: true,
  //         backgroundPicture: result.assets[0].uri,
  //         isBackgroundPictureSame: false
  //       });
  //     } else {
  //       setUserData({
  //         ...userData,
  //         isProfilePictureSame: true,
  //         profilePicture: result.assets[0].uri,
  //         isProfilePictureSame: false
  //       });
  //     }
  //   }
  // };

  const navigator = useNavigation();
  const handleSubmit = async () => {
    const response = await signup(userCredentials);
    console.log(response.status);
    if (response.status === 200) {
      const response2 = await editProfile(userData);
      console.log(response2);
      if (response.status === 200 && response2.status === 200) {
        SecureStorage.deleteItemAsync("email");
        SecureStorage.setItemAsync("email", userCredentials.email);
        SecureStorage.setItemAsync("token", response.token).then(() => {
          console.log("token saved");
          navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }]
            })
          );
        });
      }
    }
  };

  const handleEditProfile = async () => {
    const response = await editProfile(userData);
    console.log(response);
    if (response.status === 200) {
      navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }]
        })
      );
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getProfile(userCredentials.email);
      response.data.userData &&
        setUserData({
          ...userData,
          name: response?.data?.userData?.name,
          header: response?.data?.userData?.header,
          tags: response?.data?.userData?.tags,
          description: response?.data?.userData?.description,
          profilePicture: response?.data?.userData?.profilePicture,
          backgroundPicture: response?.data?.userData?.backgroundPicture
        });
    };
    if (userCredentials.isEdit) {
      fetchUserData();
    }
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={{ paddingBottom: 25 }}>
          <View>
            <View
              style={{
                height: 130,
                backgroundColor: "gray"
              }}
            >
              <Pressable
                onPress={() => {
                  selectImage("backgroundPicture");
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
                  uri: userData?.backgroundPicture
                    ? userData?.backgroundPicture
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
                  borderRadius: 50,
                  borderColor: WHITE_COLOR,
                  borderWidth: 2
                }}
              >
                <Pressable
                  onPress={() => {
                    selectImage("profileImage");
                  }}
                  style={{
                    position: "absolute",
                    backgroundColor: PRIMARY_COLOR,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    elevation: 1,
                    zIndex: 1,
                    bottom: -5,
                    right: -1,
                    // justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <EvilIcons name="pencil" size={28} color="white" />
                </Pressable>
                <Image
                  source={{
                    uri: userData?.profilePicture
                      ? userData?.profilePicture
                      : "https://i.pinimg.com/564x/a7/5a/e4/a75ae4a186483cb9965e00bc5007f7ff.jpg"
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 50
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10, justifyContent: "center" }}>
          <View style={{ marginTop: 30, marginHorizontal: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter your name
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("name", text)}
                value={userData.name}
                placeholder="John Doe"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter a header
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("header", text)}
                placeholder="Story writer"
                value={userData.header}
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                Enter tags
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("tags", text)}
                placeholder="#writer #story #fiction"
                value={userData.tags.join(",")}
                style={{
                  borderColor: "#A9A9A9",
                  padding: 10,
                  paddingLeft: 20,
                  borderWidth: 1,
                  borderRadius: 30
                }}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "600", marginBottom: 10 }}>
                A short description
              </Text>
              <TextInput
                onChangeText={(text) => setFormData("description", text)}
                multiline
                value={userData.description}
                numberOfLines={5}
                placeholder="Write a short description about yourself"
                textAlignVertical="top"
                style={{
                  borderColor: "#A9A9A9",
                  padding: 15,
                  paddingLeft: 15,
                  borderWidth: 1,
                  borderRadius: 20
                  // height: 100,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              userCredentials.isEdit ? handleEditProfile() : handleSubmit()
            }
            style={{
              backgroundColor: PRIMARY_COLOR,
              padding: 15,
              borderRadius: 30,
              marginHorizontal: 20,
              marginVertical: 10
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Complete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddInfo;
