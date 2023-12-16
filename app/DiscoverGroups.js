import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import DiscoverGroupCard from "../components/DiscoverGroupCard";
import { getGroups } from "../api/apis";

const DiscoverGroups = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroupFn = async () => {
      const response = await getGroups();
      setGroups(response);
    };
    fetchGroupFn();
  }, []);
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            Discover Groups
          </Text>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {groups?.map((item, index) => {
              return (
                <DiscoverGroupCard
                  key={index}
                  groupName={item?.groupName}
                  groupImage={item?.groupImage}
                  groupCoverImage={item?.groupCoverImage}
                  groupMembers={item?.groupMembers.length}
                  groupId={item?._id}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverGroups;
