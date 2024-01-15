import axios from "axios";

const ADDRESS = "http://192.168.53.254:3500";

export const getHeadlines = async () => {
  try {
    const response = await axios.get(`${ADDRESS}/news/get-headlines`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchHeadlines = async (query) => {
  const response = await axios.get(`${ADDRESS}/news/search-headlines/${query}`);
  return response.data;
};

export const getArticle = async (url) => {
  const response = await axios.post(`${ADDRESS}/news/get-article-body/`, {
    url
  });
  return response.data;
};

export const signup = async (userCredentials) => {
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

export const login = async (userCredentials) => {
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

export const editProfile = async (userCredentials) => {
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

export const editProfilePicture = async (data) => {
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

export const editBackgroundPicture = async (data) => {
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

export const decodeUser = async (token) => {
  const response = await axios.post(`${ADDRESS}/auth/decode`, { token: token });
  return response.data;
};

export const getProfile = async (email) => {
  console.log(email);
  const response = await axios.post(`${ADDRESS}/profile/get-profile`, {
    email: email
  });
  return response.data;
};

export const submitPost = async (data) => {
  try {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("postedBy", data.postedBy);
    formData.append("image", {
      uri: data.image,
      name: "postImage.jpg",
      type: "image/jpg"
    });
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

export const getFeeds = async () => {
  try {
    const response = await axios.get(`${ADDRESS}/post/get-feeds`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${ADDRESS}/post/delete-post/${postId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShortProfileInfo = async (email) => {
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

export const getAIResponse = async (data) => {
  try {
    const response = await axios.post(`${ADDRESS}/get-ai`, { text: data });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addBookmark = async (item, type, email) => {
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

export const getBookmarks = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/bookmark/get-bookmarks/${email}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = async (bookmarkIds, email, type) => {
  try {
    const response =
      await axios.delete(`${ADDRESS}/bookmark/delete-bookmark/${email}/${bookmarkIds}/${type}
    
    `);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId, userId) => {
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

export const commentPost = async (postId, userId, comment) => {
  try {
    const response = await axios.post(`${ADDRESS}/post/comment-post`, {
      postId,
      userId,
      comment
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPeople = async () => {
  try {
    const response = await axios.get(`${ADDRESS}/people/get-people`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = async (email, followerEmail) => {
  try {
    const response = await axios.post(`${ADDRESS}/profile/follow`, {
      email,
      followerEmail
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = async (data) => {
  const formData = new FormData();

  formData.append("groupImage", {
    uri: data.groupImage,
    name: "groupImage.jpg",
    type: "image/jpg"
  });
  formData.append("groupCoverImage", {
    uri: data.groupCoverImage,
    name: "groupCoverImage.jpg",
    type: "image/jpg"
  });
  formData.append("groupName", data.groupName);
  formData.append("groupDescription", data.groupDescription);
  formData.append("groupAdmins", JSON.stringify(data.groupAdmins));
  formData.append("groupRules", data.groupRules);
  formData.append("groupTags", data.groupTags);
  formData.append("groupDetails", JSON.stringify(data.groupDetails));
  // console.log(data.groupDetails);
  console.log("====================================");
  console.log(formData);
  console.log("====================================");
  try {
    const response = await axios.post(
      `${ADDRESS}/group/create-group`,
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

export const getGroups = async () => {
  try {
    const response = await axios.get(`${ADDRESS}/group/get-groups`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificGroup = async (groupId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/get-specific-group/${groupId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const joinThisGroup = async (email, groupId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/join-group/${groupId}/${email}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const exitThisGroup = async (email, groupId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/exit-group/${groupId}/${email}`
    );
    // console.log(response.status);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowedGroups = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/get-followed-groups/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getManagedGroups = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/get-managed-groups/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export {
//   getHeadlines,
//   searchHeadlines,
//   getArticle,
//   signup,
//   login,
//   editProfile,
//   editProfilePicture,
//   editBackgroundPicture,
//   decodeUser,
//   getProfile,
//   submitPost,
//   getFeeds,
//   getShortProfileInfo,
//   getAIResponse,
//   addBookmark,
//   getBookmarks,
//   likePost,
//   commentPost,
//   deleteBookmark,
//   deletePost,
//   getPeople,
//   handleFollow,
//   createGroup,
//   getGroups,
//   getSpecificGroup
// };
