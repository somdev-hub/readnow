import { View, Text, ScrollView, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

const GroupGenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const groupGenresDone = useSelector((state) => state.group.groupGenresDone);
  const groupData = useSelector((state) => state.group.groupData);
  // console.log(groupGenres);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Historical fiction",
    "Horror",
    "Magical realism",
    "Mystery",
    "Paranormal romance",
    "Philosophical",
    "Political",
    "Romance",
    "Saga",
    "Satire",
    "Science fiction",
    "Social",
    "Speculative",
    "Technology",
    "Industry",
    "Computer",
    "Thriller",
    "Urban",
    "Western",
    "Animation",
    "Other"
  ];
  const [originalGenres, setOriginalGenres] = useState(genres);
  const [filteredGenres, setFilteredGenres] = useState(genres);
  const handleSearch = (text) => {
    setSearch(text);
    setFilteredGenres(
      originalGenres.filter((i) => i.toLowerCase().includes(text.toLowerCase()))
    );
  };

  
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "white"
        }}
      >
        <TextInput
          multiline
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#A9A9A9",
            paddingHorizontal: 20,
            width: "100%",
            height: 50
          }}
          placeholder="Enter genre name"
          value={selectedGenre.join(", ") || search}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <View
        style={{
          paddingVertical: 10
        }}
      >
        <FlatList
          data={filteredGenres}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 10
              }}
            >
              <Text>{item}</Text>
              <Checkbox
                status={selectedGenre.includes(item) ? "checked" : "unchecked"}
                onPress={() => {
                  if (selectedGenre.includes(item)) {
                    setSelectedGenre(selectedGenre.filter((i) => i !== item));
                    dispatch({
                      type: "group/updateGroupGenres",
                      payload: selectedGenre.filter((i) => i !== item)
                    });
                  } else {
                    setSelectedGenre([...selectedGenre, item]);
                    dispatch({
                      type: "group/updateGroupGenres",
                      payload: [...selectedGenre, item]
                    });
                  }
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GroupGenreSelection;
