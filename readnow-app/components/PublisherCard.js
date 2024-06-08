import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PRIMARY_COLOR, WHITE_COLOR } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import * as SecureStorage from "expo-secure-store";
import { toggleSubscriber } from "../api/apis";

const PublisherCard = ({
  admin,
  publisher,
  hasSubscribed,
  setHasSubscribed
}) => {
  const navigator = useNavigation();
  const [subscribed, setSubscribed] = useState(publisher?.subscribed);

  const toggleSubscribeHandler = async () => {
    const email = await SecureStorage.getItemAsync("email");
    const response = await toggleSubscriber(publisher?._id, email);
    setSubscribed(!subscribed);
    setHasSubscribed({
      visible: true,
      message: response.message
    });
  };

  return (
    <Pressable
      onPress={() => {
        admin
          ? navigator.navigate("PublisherAdmin", {
              publisherId: publisher?._id
            })
          : navigator.navigate("PublisherInfo", {
              publisherId: publisher?._id
            });
      }}
      style={{
        marginTop: 10,
        width: "100%",
        backgroundColor: WHITE_COLOR,
        elevation: 1,
        borderRadius: 10,
        marginBottom: 5
      }}
      //   key={index}
    >
      <View
        style={{
          width: "100%"
        }}
      >
        <Image
          source={{ uri: publisher?.publisherCoverImage }}
          style={{
            width: "100%",
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}
        />
        <Image
          source={{
            uri: publisher?.publisherImage
              ? publisher?.publisherImage
              : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          }}
          style={{
            width: 90,
            height: 90,
            position: "absolute",
            top: 55,
            left: 20,

            borderWidth: 2,
            borderColor: WHITE_COLOR
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 0,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          flexDirection: "row",
          marginTop: 10
        }}
      >
        <View
          style={{
            marginVertical: admin ? 15 : 0
          }}
        >
          {!admin && (
            <TouchableOpacity
              onPress={toggleSubscribeHandler}
              style={{
                backgroundColor: subscribed ? WHITE_COLOR : PRIMARY_COLOR,
                padding: 7,
                paddingHorizontal: 15,
                borderRadius: 50,
                marginHorizontal: 10,
                borderColor: PRIMARY_COLOR,
                borderWidth: 2
              }}
            >
              <Text
                style={{
                  color: subscribed ? PRIMARY_COLOR : WHITE_COLOR
                }}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 15,
          marginTop: 10
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500"
          }}
        >
          {publisher?.publisherName}
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: "gray",
            fontSize: 14,
            fontWeight: "500"
          }}
        >
          {publisher?.publisherCategory}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 5
          }}
        >
          <Image
            source={{ uri: publisher?.managerInfo?.profilePicture }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50
            }}
          />
          <View>
            <Text
              style={{
                fontWeight: "500"
              }}
            >
              By {publisher?.managerInfo?.name}
            </Text>
            <Text
              style={{
                color: "gray"
              }}
            >
              {publisher?.managerInfo?.header}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 10,
            color: PRIMARY_COLOR
          }}
        >
          {publisher?.publisherTags?.map((tag) => `${tag} `)}
        </Text>
      </View>
    </Pressable>
  );
};

export default PublisherCard;
