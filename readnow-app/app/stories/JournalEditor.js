import { View, Text, ScrollView, TextInput, Dimensions } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";

const JournalEditor = () => {
  const height = Dimensions.get("window").height;
  const bottomSheetRef = React.useRef(null);
  const open = React.useCallback(() => bottomSheetRef.current?.expand(), []);

  const options = [
    {
      icon: "bold",
      title: "Bold"
    },
    {
      icon: "list",
      title: "List"
    },
    {
      icon: "star",
      title: "AI"
    },
    {
      icon: "image",
      title: "Image"
    },
    {
      icon: "file-text",
      title: "Document"
    },
    {
      icon: "video",
      title: "Video"
    }
  ];
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView
        style={{
          padding: 10
          // height: height * 0.8
        }}
      >
        <TextInput
          multiline={true}
          placeholder="Write your journal here..."
          style={{
            flex: 1
            // height: height * 0.9,
          }}
        />
      </ScrollView>
      <FAB
        onPress={() => open()}
        icon="pencil"
        style={{
          position: "absolute",
          backgroundColor: PRIMARY_COLOR,
          bottom: 50,
          right: 30
        }}
        color="white"
      />
      <BottomSheet
        enableContentPanningGesture={false}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[height * 0.1, height * 0.35]}
        enablePanDownToClose={true}
        style={{
          backgroundColor: WHITE_COLOR,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 5
        }}
      >
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          {options.map((option, index) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  width: "33%",
                  marginBottom: 20
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Feather name={option.icon} size={22} color="white" />
                </View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 15,
                    textAlign: "center",
                    marginTop: 5
                  }}
                >
                  {option.title}
                </Text>
              </View>
            );
          })}
        </View>
      </BottomSheet>
     
    </View>
  );
};

export default JournalEditor;
