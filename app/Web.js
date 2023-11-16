import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Skeleton from "../components/Skeleton";

const sliderWidth = Dimensions.get("window").width;
const Web = () => {
  const [currentSearch, setCurrentSearch] = useState("All");
  const [inputText, setInputText] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();

  const searchItems = [
    "All",
    "Tech",
    "Sports",
    "Politics",
    "Entertainment",
    "Business",
    "Science",
    "Health"
  ];

  const getNews = (query) => {
    setIsLoading(true);
    axios
      .get(`http://192.168.33.174:3500/search/${query}`)
      .then((response) => {
        setNewsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://192.168.39.254:3500")
      .then((response) => {
        setNewsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={{ marginHorizontal: 5 }}>
        <View
          style={{
            marginHorizontal: 5,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              backgroundColor: "#DDE6ED",
              borderRadius: 50,
              // padding: 5,
              margin: "auto",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 7
            }}
          >
            <AntDesign name="left" size={24} color="black" />
          </View>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>Discover</Text>
          <Text style={{ color: "#A9A9A9" }}>
            News from all around the world
          </Text>
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setInputText(text)}
            onSubmitEditing={() => {
              getNews(inputText);
            }}
            placeholder="Search"
            style={{
              backgroundColor: "#DDE6ED",
              paddingHorizontal: 15,
              width: "90%",
              height: 50,
              borderRadius: 50,
              marginHorizontal: 10,
              marginTop: 20
            }}
          />
        </View>
        <ScrollView
          horizontal
          style={{
            marginHorizontal: 0,
            marginTop: 20,
            gap: 10,
            flexDirection: "row"
          }}
          showsHorizontalScrollIndicator={false}
        >
          {searchItems.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  setCurrentSearch(item);
                  getNews(item);
                }}
                key={index}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  backgroundColor:
                    currentSearch === item ? "#39A7FF" : "#DDE6ED",
                  borderRadius: 50,
                  marginLeft: 10
                }}
              >
                <Text
                  style={{
                    color: currentSearch === item ? "white" : "#776B5D",
                    fontSize: 12
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {/* <SkeletonContent
          containerStyle={{ flex: 1, width: sliderWidth }}
          isLoading={isLoading}
        > */}
        {isLoading ? (
          <View>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </View>
        ) : (
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "column",
              marginTop: 20,
              gap: 15,
              justifyContent: "center"
            }}
          >
            {newsData.length > 1 &&
              newsData?.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() =>
                      navigator.navigate("Article", { item: item })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 7,
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={{
                          uri: item?.urlToImage
                        }}
                        height={sliderWidth * 0.3}
                        width={sliderWidth * 0.3}
                        style={{ borderRadius: 10, objectFit: "cover" }}
                      />
                      <View
                        style={{
                          flexDirection: "column",
                          flex: 1,
                          justifyContent: "space-between"
                        }}
                      >
                        {/* <Text style={{ color: "#A9A9A9" }}>{item.category}</Text> */}
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            // marginVertical: 1,
                            lineHeight: 20
                          }}
                        >
                          {item?.title?.length > 50
                            ? item.title.slice(0, 70) + "..."
                            : item.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                            gap: 20,
                            justifyContent: "space-between"
                          }}
                        >
                          <Text style={{ color: "#A9A9A9" }}>
                            {item.source.name.length > 12
                              ? item.source.name.slice(0, 12) + "..."
                              : item.source.name}
                          </Text>
                          <Text style={{ color: "#A9A9A9" }}>
                            {new Date(item.publishedAt).toDateString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                  // {/* </Link> */}
                );
              })}
          </View>
        )}
        {/* </SkeletonContent> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Web;
