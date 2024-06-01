import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

const SelectLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState("English"); // [1
  const languages = [
    "English",
    "Spanish",
    "French",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Polish",
    "Turkish",
    "Greek",
    "Thai",
    "Indonesian",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Tamil",
    "Telugu",
    "Kannada",
    "Odia",
    "Russian",
    "Arabic",
    "Hindi"
  ];
  return (
    <View>
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginLeft: 20,
            marginTop: 10
          }}
        >
          Customize your app language
        </Text>
        {languages.map((language, index) => {
          return (
            <Pressable
              onPress={() => {
                setCurrentLanguage(language);
              }}
              style={{
                marginHorizontal: 10,
                padding: 10,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              key={index}
            >
              <Text>{language}</Text>
              {currentLanguage === language && (
                <Feather name="check" size={22} color="black" />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SelectLanguage;
