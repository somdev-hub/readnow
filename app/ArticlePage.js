import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getArticle } from "../api/apis";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmail } from "../redux/bookmarkSlice";
import { Button, Snackbar } from "react-native-paper";

const ArticlePage = () => {
  const router = useRoute();
  const article = router.params.item;
  const [articleContent, setArticleContent] = useState("");
  const dispatch = useDispatch();
  const addtoBookmark = useSelector(
    (state) => state.notify.addedToNewsBookmark
  );
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    dispatch({
      type: "bookmark/addBookmark",
      payload: { bookmark: article, type: "news" }
    });
    dispatch(fetchEmail());
    getArticle(article.url).then((data) => {
      setArticleContent(data);
    });
  }, []);

  useEffect(() => {
    console.log(addtoBookmark);
  }, [addtoBookmark]);
  return (
    <View>
      <ScrollView>
        <Image
          source={{
            uri: article.urlToImage
          }}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 5,
            resizeMode: "cover"
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            // marginTop: 20,
            // alignItems: "center"
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20 }}>
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
              <Text>
                {article.author ? article.author : article.source.name}
              </Text>
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
      <Snackbar
        visible={addtoBookmark.addToNewsBookmark}
        onDismiss={() => {}}
        action={{
          label: "Done",
          onPress: () => {
            dispatch({
              type: "notify/addNewsBookmark",
              payload: false
            });
          }
        }}
      >
        Added to bookmark
      </Snackbar>
    </View>
  );
};

export default ArticlePage;
