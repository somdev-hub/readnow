import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  RefreshControl,
  Dimensions
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getShortProfileInfo,
  getSpecificJournal,
  toggleJournalLike
} from "../../api/apis";
// import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import * as SecureStorage from "expo-secure-store";

const Journal = () => {
  const width = Dimensions.get("window").width;
  const navigator = useNavigation();
  const route = useRoute();
  const { journalId } = route.params;
  const [journalData, setJournalData] = useState({});
  const [currentChapter, setCurrentChapter] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchJournal();
  });

  const toggleLike = async () => {
    const response = await toggleJournalLike(journalId, userEmail);
    if (response.status === 200) {
      const updatedJournalData = {
        ...journalData,
        journalLikes: response.data.journalLikes
      };
      setJournalData(updatedJournalData);
    }
  };

  const fetchJournal = async () => {
    setRefreshing(true);
    const response = await getSpecificJournal(journalId);
    const responseWithEditorData = await getShortProfileInfo(
      response.journal.journalEditorEmail
    );
    setJournalData({
      ...response.journal,
      editorInfo: responseWithEditorData.data
    });
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await SecureStorage.getItemAsync("email");
      setUserEmail(email);
    };
    fetchUserEmail();
    fetchJournal();
  }, []);
  const journalContentHtml = {
    html: `<h1>Chapter 1</h1><p>This is a content</p>`
  };

  if (journalData?.isStandalone) {
    journalContentHtml.html = journalData?.journalArticle;
  } else {
    journalContentHtml.html =
      journalData && journalData.chapters && journalData.chapters[0]
        ? journalData.chapters[currentChapter].chapterContent
        : "";
  }
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: WHITE_COLOR,
            padding: 10,
            elevation: 2,
            //   gap:20,
            alignItems: "center"
            // justifyContent: "space-between",
            //   flex:1
            //   width:"100%"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              flex: 1
              // marginRight: 20
            }}
          >
            <Image
              source={{
                uri: "https://picsum.photos/200/300"
              }}
              style={{
                width: 40,
                height: 40
                //   borderRadius: 50
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  marginTop: 5
                }}
              >
                <Ionicons name="newspaper-outline" size={20} color="black" />
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 12
                  }}
                >
                  PUBLISHER
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 2
                }}
              >
                Nanotech technology news and publishing
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: PRIMARY_COLOR,
              paddingVertical: 8,
              borderRadius: 50,
              paddingHorizontal: 10,
              // flex: 1
              marginLeft: 10
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={{
              uri: journalData?.journalCoverImage
            }}
            style={{
              width: "100%",
              height: 200
              // marginTop: 10
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingHorizontal: 10
            }}
          >
            {journalData?.journalTitle}
          </Text>
          <View
            style={{
              marginVertical: 10,
              paddingVertical: 5,
              borderLeftColor: PRIMARY_COLOR,
              borderLeftWidth: 7,
              paddingHorizontal: 10
            }}
          >
            <Text>{journalData?.journalDescription}</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontWeight: "500"
              }}
            >
              Editor
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  marginTop: 10
                }}
              >
                <Image
                  source={{ uri: journalData?.editorInfo?.profilePicture }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500"
                    }}
                  >
                    {journalData?.editorInfo?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13
                    }}
                  >
                    {journalData?.editorInfo?.header}
                  </Text>
                </View>
              </View>
              <Pressable
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
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              marginTop: 20,
              paddingHorizontal: 10,
              color: "gray",
              fontWeight: "500"
            }}
          >
            Published on{" "}
            {new Date(journalData?.journalPublishingDate).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: "500",
              marginBottom: 10
            }}
          >
            Chapters
          </Text>
          {!journalData?.isStandalone && (
            <View
              style={{
                borderLeftColor: PRIMARY_COLOR,
                borderLeftWidth: 7,
                paddingTop: 10
              }}
            >
              {journalData?.chapters?.map((chapter, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setCurrentChapter(index);
                    }}
                    style={{
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 10
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        width: 25,
                        height: 25,
                        borderRadius: 50
                      }}
                    >
                      <Text
                        style={{
                          color: WHITE_COLOR,
                          fontWeight: currentChapter === index ? "500" : "400",
                          textAlign: "center"
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontWeight: currentChapter === index ? "500" : "400",
                        flex: 1
                      }}
                    >
                      {chapter?.chapterTitle}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10
            }}
          >
            <RenderHtml contentWidth={width} source={journalContentHtml} />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: WHITE_COLOR,
          position: "fixed",
          bottom: 0,
          elevation: 5
        }}
      >
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            paddingTop: 10,
            paddingHorizontal: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              //   marginTop: 15,
              marginBottom: 10,
              marginLeft: 5,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center"
              }}
            >
              <AntDesign name="like2" size={22} color="black" />
              <Text>{journalData?.journalLikes?.length}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center"
              }}
            >
              <Text>{journalData?.journalComments} comments</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Pressable
            onPress={toggleLike}
            style={{
              alignItems: "center"
            }}
          >
            <AntDesign
              name={
                journalData?.journalLikes?.includes(userEmail)
                  ? "like1"
                  : "like2"
              }
              size={20}
              color={
                journalData?.journalLikes?.includes(userEmail)
                  ? PRIMARY_COLOR
                  : "black"
              }
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Like
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const { chapters, ...otherData } = journalData;
              navigator.navigate("JournalComments", {
                journalData: otherData
              });
            }}
            style={{
              alignItems: "center"
            }}
          >
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Comment
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <AntDesign name="sharealt" size={20} color="black" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500"
              }}
            >
              Share
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Journal;
