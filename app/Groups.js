import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import GroupCard from "../components/GroupCard";
import * as SecureStorage from "expo-secure-store";
import { getFollowedGroups } from "../api/apis";

const Groups = () => {
  const [followedGroups, setFollowedGroups] = useState([]);
  useEffect(() => {
    const getFollowedGroupsMethod = async () => {
      const email = await SecureStorage.getItemAsync("email");
      getFollowedGroups(email).then((data) => {
        setFollowedGroups(data);
      });
    };
    getFollowedGroupsMethod();
  }, []);
  console.log(followedGroups);
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Groups you follow
          </Text>
          <View style={{ marginTop: 10 }}>
            {followedGroups.map((item, index) => {
              return (
                <GroupCard
                  key={index}
                  groupId={item._id}
                  groupImg={item.groupImage}
                  groupName={item.groupName}
                  groupFollowers={item.groupMembers.length}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Groups;
