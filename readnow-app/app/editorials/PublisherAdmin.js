import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import EditionCard from "../../components/EditionCard";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  getShortProfileInfo,
  getSpecificPublisher,
  getUserFollowers,
  handleFollow,
  toggleSubscriber
} from "../../api/apis";
import * as SecureStorage from "expo-secure-store";
import { Snackbar } from "react-native-paper";

const PublisherAdmin = () => {
  const navigator = useNavigation();
  const [publisherData, setPublisherData] = useState({});
  const { publisherId } = useRoute().params;
  const [email, setEmail] = useState("");
  const [followedManager, setFollowedManager] = useState(false);
  const [publisherJournals, setPublisherJournals] = useState([]);

  const [hasSubscribed, setHasSubscribed] = useState({
    visible: false,
    message: ""
  });

  const handleFollowPublisherManager = async () => {
    const response = await handleFollow(email, publisherData?.publisherManager);
    setFollowedManager(!followedManager);
  };

  useEffect(() => {
    const fetchManagerFollowers = async () => {
      const response = await getUserFollowers(publisherData?.publisherManager);
      setFollowedManager(response?.followers?.includes(email));
    };
    fetchManagerFollowers();
  }, [publisherData, email]);

  useEffect(() => {
    const getEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      setEmail(email);
    };
    const fetchPublisherData = async () => {
      const { publisherData } = await getSpecificPublisher(publisherId);
      const publisherManagerData = await getShortProfileInfo(
        publisherData.publisher?.publisherManager
      );

      setPublisherData({
        ...publisherData.publisher,
        managerInfo: publisherManagerData.data
      });

      const publisherJournalsWithEditorData = await Promise.all(
        publisherData.publisherJournals.map(async (journal) => {
          const editorData = await getShortProfileInfo(
            journal.journalEditorEmail
          );
          return {
            ...journal,
            editorInfo: editorData.data,
            publisher: publisherData?.publisher?.publisherName
          };
        })
      );

      setPublisherJournals(publisherJournalsWithEditorData);
    };

    fetchPublisherData();
    getEmail();
  }, []);

  const socialMediaMapping = {
    twitter: "twitter",
    facebook: "facebook-square",
    instagram: "instagram",
    website: "link"
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "flex-start"
            }}
          >
            <Image
              source={{
                uri: publisherData?.publisherImage
                  ? publisherData?.publisherImage
                  : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login"
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5
              }}
            />
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  flexDirection: "row",

                  gap: 5,
                  alignItems: "center",
                  marginTop: 5
                }}
              >
                <Ionicons name="newspaper-outline" size={24} color="black" />
                <Text
                  style={{
                    fontWeight: "500"
                  }}
                >
                  PUBLISHER
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginTop: 5
                }}
              >
                {publisherData?.publisherName}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16
            }}
          >
            {publisherData?.publisherDescription}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center"
                // marginTop: 20
              }}
            >
              <Image
                source={{
                  uri: publisherData?.managerInfo?.profilePicture
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50
                  // marginTop: 20
                }}
              />
              <View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16
                  }}
                >
                  By {publisherData?.managerInfo?.name}
                </Text>
                <Text
                  style={{
                    color: "gray"
                  }}
                >
                  {publisherData?.managerInfo?.followers} followers
                </Text>
              </View>
            </View>
            <Pressable onPress={handleFollowPublisherManager}>
              {followedManager ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                  }}
                >
                  <Entypo name="check" size={20} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontWeight: "500"
                    }}
                  >
                    Following
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                  }}
                >
                  <Entypo name="plus" size={20} color={PRIMARY_COLOR} />
                  <Text
                    style={{
                      color: PRIMARY_COLOR,
                      fontWeight: "500"
                    }}
                  >
                    Follow
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                // fontSize: 16
                color: "grey"
              }}
            >
              {publisherData?.publisherCategory} |{" "}
              {publisherData?.publisherSubscribers?.length} subscribers
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              gap: 10,
              width: "100%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("CreateJournal", {
                  publisherId
                })
              }
              style={{
                backgroundColor: PRIMARY_COLOR,
                paddingVertical: 8,
                borderRadius: 50,
                flex: 1
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "500"
                }}
              >
                Create journal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("PublishersAdminOptions", {
                  publisherId
                })
              }
              style={{
                paddingVertical: 8,
                borderRadius: 50,
                flex: 1,
                borderColor: PRIMARY_COLOR,
                borderWidth: 2
              }}
            >
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  textAlign: "center",
                  fontWeight: "500"
                }}
              >
                Options
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "500" }}>Social profiles</Text>
            <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
              {Object.entries(socialMediaMapping).map(
                ([socialMedia, iconName]) => {
                  const url = publisherData?.publisherSocials?.[socialMedia];
                  return (
                    url && (
                      <Pressable
                        key={socialMedia}
                        onPress={async () => {
                          const supported = await Linking.canOpenURL(url);
                          if (supported) {
                            await Linking.openURL(url);
                          } else {
                            console.log(
                              `Don't know how to open this URL: ${url}`
                            );
                          }
                        }}
                      >
                        <AntDesign name={iconName} size={22} color="black" />
                      </Pressable>
                    )
                  );
                }
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
            Editions {publisherJournals?.length}
          </Text>
          <View style={{ marginTop: 20 }}>
            {publisherJournals?.map((journal, index) => {
              return <EditionCard key={index} journal={journal} admin={true} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PublisherAdmin;
