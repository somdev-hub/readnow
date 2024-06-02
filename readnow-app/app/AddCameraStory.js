import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddCameraStory = () => {
  const navigator = useNavigation();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  if (!cameraPermission) {
    requestCameraPermission();
  }

  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);

  const changeCameraType = () => {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      setCapturedImage(photo);
      navigator.navigate("EditStory", { story: photo?.uri });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        ratio="16:9"
        style={{ flex: 1, alignItems: "center" }}
        type={cameraType}
        ref={(ref) => {
          this.camera = ref;
        }}
      />
      <View
        style={{
          //   marginBottom: 20,
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Pressable
          onPress={() => {
            changeCameraType();
          }}
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 50,
            width: 40,
            height: 40,
            padding: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Ionicons name="camera-reverse" size={24} color="white" />
        </Pressable>
        <View
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 50,
            width: 60,
            height: 60,
            padding: 2
          }}
        >
          <Pressable
            onPress={() => {
              takePicture();
            }}
            style={{
              borderRadius: 50,
              backgroundColor: "white",
              padding: 10,
              width: "100%",
              height: "100%"
            }}
          ></Pressable>
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default AddCameraStory;
