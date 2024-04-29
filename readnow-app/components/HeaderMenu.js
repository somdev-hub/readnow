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

const HeaderMenu = () => {
  const navigator = useNavigation();
  const [menuItem, setMenuItem] = React.useState({
    news: true,
    following: false
  });
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <View style={[styles.flexBox, { gap: 10 }]}>
          <Pressable
            onPress={() => navigator.navigate("Web")}
            style={[styles.iconCircle]}
          >
            <Entypo name="magnifying-glass" size={22} color="black" />
          </Pressable>
          <View style={[styles.iconCircle]}>
            <Feather name="bell" size={22} color="black" />
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
