import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStorage from "expo-secure-store";
// import axios from "axios";
import { submitPost } from "../api/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmail } from "../redux/postSlice";
import BufferModule from "buffer";



const screenHeights = Dimensions.get("window").height;
const AddPost = () => {
  // const userMail = SecureStorage.getItemAsync("userMail");
  const [postImage, setPostImage] = useState(null);
  const [userMail, setUserMail] = useState("");
  // const [postData, setPostData] = useState({
  //   description: "",
  //   postedBy: "",
  //   image: null
  // });
  const Buffer = BufferModule.Buffer;
  SecureStorage.getItemAsync("email").then((res) => setUserMail(res));
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postData);
  const switchValue = useSelector((state) => state.post.switch);

  const firstRender = useRef(true);
  // console.log(userMail);

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
  const handleSubmit = () => {
    console.log(postData);
  };

  const selectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
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
          />
        </ScrollView>
        {postImage && (<View
          style={{
            height: 75,
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "#fff",
            padding: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
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
