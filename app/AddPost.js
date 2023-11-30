import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStorage from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmail } from "../redux/postSlice";
import { FAB, Surface, ActivityIndicator, MD2Colors } from "react-native-paper";
import { getAIResponse } from "../api/apis";

const screenHeights = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const AddPost = () => {
  const [postImage, setPostImage] = useState(null);
  const [userMail, setUserMail] = useState("");

  SecureStorage.getItemAsync("email").then((res) => setUserMail(res));
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postData);
  const switchValue = useSelector((state) => state.post.switch);
  const [surfaceVisible, setSurfaceVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);

  const firstRender = useRef(true);

  const handleInputChanges = (text) => {
    dispatch({
      type: "post/updatePostData",
      payload: {
        description: text,
        postedBy: postData.postedBy,
        image: postData.image
      }
    });
  };
  const aiPromptHandler = (text) => {
    setAiPrompt(text);
  };
  const handleSubmit = () => {
    console.log(postData);
  };
  const handleAI = async () => {
    // console.log(aiPrompt);
    setIsAILoading(true);
    const response = await getAIResponse(aiPrompt);
    // console.log(response.data);
    dispatch({
      type: "post/updatePostData",
      payload: {
        description: response.data,
        postedBy: postData.postedBy,
        image: postData.image
      }
    });
    setIsAILoading(false);
    setSurfaceVisible(false);
  };

  const selectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (!response.canceled) {
      setPostImage(response.assets[0].uri);
      dispatch({
        type: "post/updatePostData",
        payload: {
          image: response.assets[0].uri,
          postedBy: postData.postedBy,
          description: postData.description
        }
      });
    }
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

    dispatch(fetchEmail());
  }, []);
  return (
    <View>
      {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
      <View
        style={{
          position: "relative",
          backgroundColor: "white",
          marginTop: 10,
          //   elevation: 1,
          height: screenHeights * 0.8
        }}
      >
        <ScrollView>
          <TextInput
            multiline
            textAlignVertical="top"
            placeholder="Enter your thoughts..."
            style={{ fontSize: 16, height: "100%", padding: 10 }}
            onChangeText={(text) => handleInputChanges(text)}
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
              backgroundColor: "#fff",
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
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 3
                }}
              >
                <Entypo
                  name="cross"
                  size={18}
                  color="black"
                  // style={{ position: "absolute" }}
                />
              </Pressable>
            </View>
          </View>
        )}
        {surfaceVisible && (
          <Surface
            style={{
              padding: 3,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              height: 350,
              width: screenWidth * 0.9,
              alignSelf: "center",
              position: "absolute",
              bottom: 100,
              borderRadius: 10
              // alignItems: "center",
            }}
            elevation={2}
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
                backgroundColor: "#39A7FF",
                borderRadius: 10
              }}
            >
              {isAILoading ? (
                <ActivityIndicator animating={true} color="#fff" />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
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
          color="#fff"
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#39A7FF",
            color: "#fff"
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
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default AddPost;
