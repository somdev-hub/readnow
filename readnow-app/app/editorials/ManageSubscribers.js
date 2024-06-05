import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Menu, Snackbar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import {
  addEditor,
  getShortProfileInfo,
  getSpecificPublisher,
  removeSubscriber
} from "../../api/apis";

const ManageSubscribers = () => {
  const route = useRoute();
  const { publisherId } = route.params;
  const [visibleMenu, setVisibleMenu] = useState({
    visible: false,
    index: null
  });
  const [visibleSnackbar, setVisibleSnackbar] = useState({
    visible: false,
    message: ""
  });
  const [subscribers, setSubscribers] = useState([]);

  const add = async (editorEmail) => {
    const response = await addEditor(publisherId, editorEmail);
    if (response.status === 200) {
      setVisibleSnackbar({
        visible: true,
        message: "Editor added successfully"
      });
    } else {
      setVisibleSnackbar({
        visible: true,
        message: "Error adding editor"
      });
    }
  };

  const remove = async (email) => {
    const response = await removeSubscriber(publisherId, email);
    if (response.status === 200) {
      setVisibleSnackbar({
        visible: true,
        message: "Subscriber removed successfully"
      });
    } else {
      setVisibleSnackbar({
        visible: true,
        message: "Error removing subscriber"
      });
    }
  };

  useEffect(() => {
    const getSubscribers = async () => {
      const {
        publisherData: { publisher }
      } = await getSpecificPublisher(publisherId);

      const subscribersWithData = await Promise.all(
        publisher?.publisherSubscribers.map(async (subscriber) => {
          const subscriberData = await getShortProfileInfo(subscriber);
          return { subscriberData: subscriberData.data };
        })
      );

      setSubscribers(subscribersWithData);
    };
    getSubscribers();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1
      }}
    >
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
            marginHorizontal: 10
          }}
        >
          Subscribers
        </Text>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 20
          }}
        >
          {subscribers?.map((subscriber, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginBottom: 15,
                  flex: 1
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                  }}
                >
                  <Image
                    source={{
                      uri: subscriber?.subscriberData?.profilePicture
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500"
                        }}
                      >
                        {subscriber?.subscriberData?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#A9A9A9"
                        }}
                      >
                        {subscriber?.subscriberData?.header}
                      </Text>
                    </View>
                  </View>
                </View>
                <Menu
                  visible={visibleMenu.visible && visibleMenu.index === index}
                  onDismiss={() =>
                    setVisibleMenu({
                      visible: false,
                      index: null
                    })
                  }
                  anchor={
                    <Pressable
                      onPress={() =>
                        setVisibleMenu({
                          visible: true,
                          index
                        })
                      }
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color="black"
                      />
                    </Pressable>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      add(subscriber?.subscriberData?.email);
                      setVisibleMenu({
                        visible: false,
                        index: null
                      });
                    }}
                    title="Add as editor"
                  />
                  <Menu.Item
                    onPress={() => {
                      remove(subscriber?.subscriberData?.email);
                      setVisibleMenu({
                        visible: false,
                        index: null
                      });
                    }}
                    title="Remove"
                  />
                </Menu>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnackbar.visible}
        onDismiss={() => setVisibleSnackbar({ visible: false, message: "" })}
        action={{
          label: "Ok",
          onPress: () => {
            setVisibleSnackbar({ visible: false, message: "" });
          }
        }}
      >
        {visibleSnackbar.message}
      </Snackbar>
    </ScrollView>
  );
};

export default ManageSubscribers;
