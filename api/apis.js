import axios from "axios";

const ADDRESS = "http://192.168.39.254:3500";

const getHeadlines = async () => {
  const response = await axios.get(`${ADDRESS}/news/get-headlines`);
  return response.data;
};

const searchHeadlines = async (query) => {
  const response = await axios.get(`${ADDRESS}/news/search-headlines/${query}`);
  return response.data;
};

const getArticle = async (url) => {
  const response = await axios.post(`${ADDRESS}/news/get-article-body`, {
    url: url
  });
  // console.log(response.data);
  return response.data;
};

const signup = async (userCredentials) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/profile/add-user`,
      userCredentials
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userCredentials) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/auth/authenticate`,
      userCredentials
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (userCredentials) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/profile/edit-profile`,
      userCredentials
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editProfilePicture = async (data) => {
  const formData = new FormData();
  console.log(data);
  formData.append("profilePicture", {
    uri: data.image,
    name: "profilePicture.jpg",
    type: "image/jpg"
  });
  formData.append("email", data.email);
  try {
    const response = await axios.post(
      `${ADDRESS}/profile/edit-profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editBackgroundPicture = async (data) => {
  const formData = new FormData();
  formData.append("backgroundPicture", {
    uri: data.image,
    name: "profilePicture.jpg",
    type: "image/jpg"
  });
  formData.append("email", data.email);
  const response = await axios.post(
    `${ADDRESS}/profile/edit-background-picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

const decodeUser = async (token) => {
  const response = await axios.post(`${ADDRESS}/auth/decode`, { token: token });
  return response.data;
};

const getProfile = async (email) => {
  const response = await axios.post(`${ADDRESS}/profile/get-profile`, {
    email: email
  });
  return response.data;
};

const submitPost = async (data) => {
  try {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("postedBy", data.postedBy);
    formData.append("image", {
      uri: data.image,
      name: "postImage.jpg",
      type: "image/jpg"
    });
    // console.log("hello");
    const response = await axios.post(`${ADDRESS}/post/add-post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getFeeds = async () => {
  try {
    const response = await axios.get(`${ADDRESS}/post/get-feeds`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getShortProfileInfo = async (email) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/profile/get-short-profile-info`,
      {
        email
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAIResponse = async (data) => {
  try {
    const response = await axios.post(`${ADDRESS}/get-ai`, { text: data });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addBookmark = async (item, type, email) => {
  try {
    const response = await axios.post(`${ADDRESS}/bookmark/add-bookmark`, {
      item,
      type,
      email
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getBookmarks = async (email) => {
  try {
    const response = await axios.post(`${ADDRESS}/bookmark/get-bookmarks`, {
      email
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (postId, userId) => {
  try {
    const response = await axios.post(`${ADDRESS}/post/like-post`, {
      postId,
      userId
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getHeadlines,
  searchHeadlines,
  getArticle,
  signup,
  login,
  editProfile,
  editProfilePicture,
  editBackgroundPicture,
  decodeUser,
  getProfile,
  submitPost,
  getFeeds,
  getShortProfileInfo,
  getAIResponse,
  addBookmark,
  getBookmarks,
  likePost
};
