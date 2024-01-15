import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PeopleCard from "../components/PeopleCard";

const TopTab = createMaterialTopTabNavigator();

const EventDetails = () => {
  return (
    <View>
      <Text>About</Text>
      <Text>
        Adipisicing reprehenderit esse consectetur quis nulla magna ipsum
        veniam. Qui quis reprehenderit deserunt laboris ipsum. Incididunt dolore
        in consectetur consequat incididunt veniam mollit ipsum proident commodo
        eu deserunt sit ex. Tempor ad magna dolor et laborum laboris
        reprehenderit. Dolore magna aliquip aute non non proident anim. Sit est
        exercitation ea proident laboris ipsum. Id nostrud cupidatat cupidatat
        adipisicing. Anim sint veniam in sint anim officia.
      </Text>
    </View>
  );
};

const EventPage = () => {
  const height = Dimensions.get("window").height;
  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: "https://picsum.photos/200/300"
            }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 1,
              position: "absolute",
              top: 10,
              left: 10,
              alignItems: "center"
            }}
          >
            <Entypo name="dot-single" size={30} color="red" />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Live tomorrow
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500"
              //   }}>Workshop on plant healthcare and nutrition</Text>
            }}
          >
            Workshop on plant healthcare and nutrition, acheiving the best
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginTop: 5
            }}
          >
            Event organized by Dr. Pradeep Singh
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              21 Dec, 2020, Thursday, 4:00pm - 5:00pm
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              alignItems: "center"
            }}
          >
            <Ionicons name="people-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              200 attendees
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              alignItems: "center"
            }}
          >
            <Ionicons name="videocam-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginLeft: 5
              }}
            >
              Event mode - Video
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              gap: 5,
              width: "100%"
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#6C3428",
                padding: 7,
                borderRadius: 50,
                flex: 1
                // elevation: 3
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Attend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // backgroundColor: "#6C3428",
                borderColor: "#6C3428",
                borderWidth: 1,
                padding: 7,
                borderRadius: 50,
                flex: 1
                // elevation: 3
              }}
            >
              <Text style={{ color: "#6C3428", textAlign: "center" }}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
          {/* <EventDetails/> */}
        </View>
        {/* <View style={{ marginTop: 10 }}> */}
        {/* <TopTab.Navigator>
            <TopTab.Screen name="Details">
              {() => ( */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 10,
            paddingVertical: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500"
              //   }}>Workshop on plant healthcare and nutrition</Text>
            }}
          >
            About
          </Text>
          <Text style={{ marginTop: 10 }}>
            Adipisicing reprehenderit esse consectetur quis nulla magna ipsum
            veniam. Qui quis reprehenderit deserunt laboris ipsum. Incididunt
            dolore in consectetur consequat incididunt veniam mollit ipsum
            proident commodo eu deserunt sit ex. Tempor ad magna dolor et
            laborum laboris reprehenderit. Dolore magna aliquip aute non non
            proident anim. Sit est exercitation ea proident laboris ipsum. Id
            nostrud cupidatat cupidatat adipisicing. Anim sint veniam in sint
            anim officia.
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                color: "#49755D",
                fontWeight: "500",
                fontSize: 16,
                textAlign: "center"
              }}
            >
              More details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingVertical: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500"
            }}
          >
            Speakers
          </Text>
          <View>
            <PeopleCard
              name="Dr. Pradeep Singh"
              header="Professor, IIT Kanpur"
              tags="#Plant Healthcare, #Nutrition, #Agriculture, #Plant Science"
              followed={false}
              image="https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png"
              background="https://hips.hearstapps.com/hmg-prod/images/indoor-plants-1-64f051a37d451.jpg"
              userEmail="stevewings@gmail.com"
            />
            <PeopleCard
              name="Dr. Sikha Sharma"
              header="Biochemist, IISER, Pune"
              tags="#Plant Healthcare, #Nutrition, #Agriculture, #Plant Science"
              followed={false}
              image="https://c.superprof.com/i/a/20975136/10127100/600/20220613124840/assistant-professor-lady-shri-ram-college-for-women-trained-teach-all-aspects-english-language.jpg"
              background="https://i.cbc.ca/1.4839023.1537972363!/fileImage/httpImage/image.png_gen/derivatives/16x9_780/plants-ft.png"
              userEmail="stevewings@gmail.com"
            />
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default EventPage;
