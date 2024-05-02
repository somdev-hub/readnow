import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WHITE_COLOR } from "../styles/colors";

const HeaderMenu = ({ title }) => {
  const navigator = useNavigation();
  const [menuItem, setMenuItem] = React.useState({
    news: true,
    following: false
  });
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color:WHITE_COLOR
          // color: "#39A7FF"
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          // width: "100%",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <View style={[styles.flexBox, { gap: 10 }]}>
          <Pressable
            onPress={() => navigator.navigate("Web")}
            style={[styles.iconCircle]}
          >
            <Entypo name="magnifying-glass" size={22} color="white" />
          </Pressable>
          <View style={[styles.iconCircle]}>
            <Feather name="bell" size={22} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#39A7FF",
    marginHorizontal: 10,
    paddingVertical: 10
  },
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

export default HeaderMenu;
