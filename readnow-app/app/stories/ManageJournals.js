import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getShortProfileInfo, getSpecificPublisher } from "../../api/apis";
import EditionCard from "../../components/EditionCard";

const ManageJournals = () => {
  const route = useRoute();
  const { publisherId } = route.params;
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const { publisherData } = await getSpecificPublisher(publisherId);
      const publisherJournalsWithEditorData = await Promise.all(
        publisherData.publisherJournals.map(async (journal) => {
          const editorData = await getShortProfileInfo(
            journal.journalEditorEmail
          );
          return {
            ...journal,
            editorInfo: editorData.data,
            publisher: publisherData?.publisher?.publisherName
          };
        })
      );

      setJournals(publisherJournalsWithEditorData);
    };

    fetchJournals();
  }, []);

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          marginBottom: 20,
          marginTop: 10,
          marginLeft: 10
        }}
      >
        Journals
      </Text>
      <View>
        {journals?.map((journal, index) => {
          return (
            <EditionCard
              key={index}
              journal={journal}
              admin={true}
              //   publisherId={publisherId}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ManageJournals;
