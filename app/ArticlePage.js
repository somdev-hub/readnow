import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getArticle } from "../api/apis";

const ArticlePage = () => {
  const router = useRoute();
  const article = router.params.item;
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    getArticle(article.url).then((data) => {
      setArticleContent(data);
    });
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={{
            uri: article.urlToImage
          }}
          style={{
            width: "100%",
            height: 250,
            // marginTop: 20,
            borderRadius: 5,
            resizeMode: "cover"
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 10 }}>
          {article.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "#A9A9A9",
            paddingBottom: 10
          }}
        >
          <View style={{}}>
            <Text
              style={{ fontWeight: "500", marginBottom: 5, color: "#A9A9A9" }}
            >
              Posted by
            </Text>
            <Text>{article.author}</Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                fontWeight: "500",
                marginBottom: 5,
                textAlign: "right",
                color: "#A9A9A9"
              }}
            >
              Date
            </Text>
            <Text style={{ textAlign: "right" }}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "justify" }}>{articleContent}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ArticlePage;
