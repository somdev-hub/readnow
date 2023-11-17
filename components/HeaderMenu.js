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
      </View>
      {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => {
            setMenuItem({ news: true, following: false });
            navigator.navigate("News");
          }}
          style={[
            styles.menuItem,
            { borderBottomWidth: menuItem.news ? 2 : 0 }
          ]}
        >
          <Text
            style={{
              fontWeight: "500",
              color: menuItem.news ? "#39A7FF" : "#000"
            }}
          >
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMenuItem({ news: false, following: true });
            navigator.navigate("Feed");
          }}
          style={[
            styles.menuItem,
            { borderBottomWidth: menuItem.following ? 2 : 0 }
          ]}
        >
          <Text
            style={{
              fontWeight: "500",
              color: menuItem.following ? "#39A7FF" : "#000"
            }}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View> */}
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
