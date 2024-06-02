import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Button,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const AddStory = () => {
  const navigator = useNavigation();
  const width = Dimensions.get("window").width;
  const [assets, setAssets] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  if (!cameraPermission) {
    requestCameraPermission();
  }

  useEffect(() => {
    const getAlbum = async () => {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }

      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 10,
        mediaType: "photo",
        sortBy: MediaLibrary.SortBy.creationTime
      });

      setAssets(assets);
    };

    getAlbum();
  }, []);

  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          <View
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* <Image
              source={{
                uri: "https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?cs=srgb&dl=pexels-brett-sayles-2850290.jpg&fm=jpg"
              }}
              style={{ width: width / 3, height: 220 }}
            /> */}
            <Camera
              style={{ width: width / 3, height: 220, flex: 1 }}
              type={CameraType.back}
            ></Camera>
            <Pressable
              onPress={() => {
                navigator.navigate("AddCameraStory");
              }}
              style={{
                position: "absolute",
                top: 80,
                right: 40,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10
              }}
            >
              <Feather name="camera" size={24} color="black" />
            </Pressable>
          </View>
          {assets?.map((link, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigator.navigate("EditStory", { story: link?.uri });
                }}
                key={index}
              >
                <Image
                  source={{
                    uri: link?.uri
                  }}
                  style={{ width: width / 3, height: 220 }}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddStory;
