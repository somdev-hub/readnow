import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Slider from "../components/Slider";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Skeleton from "../components/Skeleton";
import { Drawer } from "react-native-drawer-layout";
import DrawerContent from "../components/DrawerContent";

const sliderWidth = Dimensions.get("window").width;
const imageWidth = Dimensions.get("window").width * 0.7;

const Home = () => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigation();
  const [headlines, setHeadlines] = React.useState([
    {
      title: "Item 1",
      urlToImage:
        "https://static.toiimg.com/thumb/imgsize-17912,msid-101495834,width-400,resizemode-4/101495834.jpg"
    },
    {
      title: "Item 1",
      urlToImage:
        "https://static.toiimg.com/thumb/imgsize-17912,msid-101495834,width-400,resizemode-4/101495834.jpg"
    },
    {
      title: "Item 1",
      urlToImage:
        "https://static.toiimg.com/thumb/imgsize-17912,msid-101495834,width-400,resizemode-4/101495834.jpg"
    }
  ]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://192.168.39.254:3500/get-headlines")
      .then((response) => {
        setNewsData(response.data);
        setHeadlines(response.data.slice(0, 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    // <Drawer
    //   open={drawer}
    //   drawerWidth={500}
    //   // drawerPosition="right"
    //   onOpen={() => {
    //     setDrawer(true);
    //   }}
    //   onClose={() => {
    //     setDrawer(false);
    //   }}
    //   renderDrawerContent={() => {
    //     return <DrawerContent />;
    //   }}
    // >
      <View>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={"transparent"}
        />
        <ScrollView>
          <View style={{ marginHorizontal: 0 }}>
            {/* <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Pressable
                onPress={() => {
                  setDrawer(true);
                }}
                style={[styles.iconCircle]}
              >
                <Feather name="menu" size={24} color="black" />
              </Pressable>
              <View style={[styles.flexBox, { gap: 10 }]}>
                <Pressable
                  onPress={() => navigator.navigate("Web")}
                  style={[styles.iconCircle]}
                >
                  <Entypo name="magnifying-glass" size={24} color="black" />
                </Pressable>
                <View style={[styles.iconCircle]}>
                  <Feather name="bell" size={24} color="black" />
                </View>
              </View>
            </View> */}
            <View>
              <View
                style={[
                  styles.flexBetween,
                  { marginTop: 20, marginHorizontal: 10 }
                ]}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Breaking News
                </Text>
                <Pressable>
                  <Text style={[styles.textBlue]}>view all</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Carousel
                layout="default"
                key={headlines.length}
                layoutCardOffset={9}
                activeSlideAlignment="center"
                firstItem={1}
                centerContent={true}
                ref={isCarousel}
                data={headlines}
                renderItem={Slider}
                sliderWidth={sliderWidth}
                itemWidth={imageWidth}
                inactiveSlideShift={0}
                //   useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
              />

              <Pagination
                dotsLength={headlines.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: "#A9A9A9"
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <View
                style={[
                  styles.flexBetween,
                  {
                    marginTop: 10
                  }
                ]}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Recommendation
                </Text>
                <Pressable>
                  <Text style={[styles.textBlue]}>view all</Text>
                </Pressable>
              </View>
              {isLoading && (
                <View>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </View>
              )}
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 20,
                  gap: 15,
                  justifyContent: "center"
                }}
              >
                {newsData.map((item, index) => {
                  return (
                    // <Link href={"./article"} key={index}>
                    <Pressable
                      key={index}
                      // onPress={() => navigator.push("article", { item })}
                      onPress={() =>
                        navigator.navigate("Article", { item: item })
                      }
                    >
                      <View
                        // key={index}
                        style={{
                          flexDirection: "row",
                          gap: 7,
                          alignItems: "center"
                        }}
                      >
                        <Image
                          source={{
                            uri: item.urlToImage
                          }}
                          height={sliderWidth * 0.3}
                          width={sliderWidth * 0.3}
                          style={{ borderRadius: 10 }}
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
                              fontSize: 14,
                              // marginVertical: 1,
                              lineHeight: 20
                            }}
                          >
                            {item.title.length > 80
                              ? item.title.slice(0, 80) + "..."
                              : item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 10,
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
            </View>
          </View>
        </ScrollView>
      </View>
    // </Drawer>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconCircle: {
    backgroundColor: "#DDE6ED",
    borderRadius: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 7
  },
  textBlue: {
    color: "#39A7FF",
    fontWeight: "500",
    fontSize: 16
  }
});

export default Home;