import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const PeopleProfile = () => {
  const route = useRoute();
  const personData = route.params.item;
  const [followed, setFollowed] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "start",
          marginTop: 20,
          borderBottomWidth: 1,
          paddingBottom: 15,
          borderBottomColor: "#ddd"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 20 }}>
          Your Profile
        </Text>
      </View> */}
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderBottomColor: "#eeeeee",
            paddingBottom: 20
          }}
        >
          <View style={{ height: 120, position: "relative" }}>
            <Image
              source={{
                uri: personData.background
              }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
            <View
              style={{
                width: 100,
                height: 100,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 50,
                position: "absolute",
                backgroundColor: "#eeeeee",
                bottom: -40,
                left: 20
              }}
            >
              <Image
                source={{
                  uri: personData.image
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 50
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {personData.name}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  color: "#A9A9A9",
                  //   fontWeight: "500",
                  fontSize: 16
                }}
              >
                {personData.header}
              </Text>
              <Text style={{ marginTop: 10, color: "#00A9FF" }}>
                {personData.tags}
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.textStyle}>200 followers</Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>100 following</Text>
                <Text style={styles.textStyle}>|</Text>
                <Text style={styles.textStyle}>20 posts</Text>
              </View>
            </View>
            <TouchableOpacity
            onPress={() => {
              setFollowed(!followed);
            }}
            style={{
              borderColor: "#39A7FF",
              //   borderWidth: followed ? 0 : 1,
              borderWidth: 2,
              marginHorizontal: 20,
              padding: 10,
              borderRadius: 30,
              marginTop: 20,
            //   width: 80,
              backgroundColor: followed ? "#39A7FF" : "white"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: followed ? "white" : "#39A7FF",
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              {followed ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Description</Text>
          <Text style={{ marginTop: 10, fontSize: 12 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of versions of ve Lorem Ipsum.{" "}
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              Read more...
            </Text>{" "}
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            // paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white"
          }}
        >
          <Text
            style={{ fontWeight: "500", fontSize: 16, paddingHorizontal: 20 }}
          >
            Your posts
          </Text>
          <ScrollView
            horizontal
            style={{ marginTop: 20, flexDirection: "row", gap: 20 }}
          >
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                marginRight: 10,
                borderRadius: 50,
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
                Posts
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                borderRadius: 50,
                marginRight: 10,
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
                Videos
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                paddingHorizontal: 10,
                borderWidth: 2,
                // flex:1,
                width: "auto",
                borderRadius: 50,
                borderColor: "#39A7FF"
              }}
            >
              <Text style={{ color: "#39A7FF", textAlign: "center" }}>
                Videos
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "500"
    // fontSize: 18
    // marginLeft: 20
  }
});

export default PeopleProfile;