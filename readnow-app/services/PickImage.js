import * as DocumentPicker from "expo-document-picker";

export const pickImage = async () => {
  try {
    const document = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true
    });
    if (document.canceled === false) {
      return document.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
