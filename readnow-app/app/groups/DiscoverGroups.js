import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import DiscoverGroupCard from "../../components/DiscoverGroupCard";
import { getGroups, searchGroups } from "../../api/apis";
import { Searchbar } from "react-native-paper";

const DiscoverGroups = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedGroups, setSearchedGroups] = useState([]);
  useEffect(() => {
    const fetchGroupFn = async () => {
      const response = await getGroups();
      setGroups(response);
    };
    fetchGroupFn();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchQuery) {
        const response = await searchGroups(searchQuery);
        setSearchedGroups(response);
      } else {
        setSearchedGroups([]);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);
  return (
    <View>
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          <Searchbar
            mode="bar"
            placeholder="Search"
            style={{ marginTop: 20, backgroundColor: "#DDE6ED" }}
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
          />
        </View>
        {searchedGroups?.length > 0 && (
          <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Search results
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
              {searchedGroups?.map((item, index) => {
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
        )}
        {/* {searchGroups?.length === 0 && ( */}
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
       {/* // )}*/}
      </ScrollView>
    </View>
  );
};

export default DiscoverGroups;
