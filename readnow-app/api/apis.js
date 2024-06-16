import axios from "axios";
import { io } from "socket.io-client";
import * as SecureStorage from "expo-secure-store";
import NavigationService from "../services/NavigationService";
import { updateReRouteToLogin } from "../redux/authSlice";
// import store from "../redux/store";
// import { dispatch } from "./dispatch";

const ADDRESS = "http://192.168.205.254:3500";

const api = axios.create({
  baseURL: ADDRESS
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStorage.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return api
        .post("auth/refresh")
        .then((response) => {
          SecureStorage.setItemAsync("token", response.token);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.token}`;
          return api(originalRequest);
        })
        .catch(async (error) => {
          console.log(error);
          await SecureStorage.deleteItemAsync("token");
          await SecureStorage.deleteItemAsync("email");
          // NavigationService.navigate("Login");
          // dispatch(updateReRouteToLogin(true));

          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export const socket = io(ADDRESS, {
  transports: ["websocket"]
});

export const getHeadlines = async () => {
  try {
    const response = await api.get("/news/get-headlines");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchHeadlines = async (query) => {
  // const response = await axios.get(`${ADDRESS}/news/search-headlines/${query}`);
  const response = await api.get(`/news/search-headlines/${query}`);
  return response.data;
};

export const getArticle = async (url) => {
  // const response = await axios.post(`${ADDRESS}/news/get-article-body/`, {
  //   url
  // });
  const response = await api.post("/news/get-article-body/", {
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
    // console.log(response.status);
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

export const getUserFollowers = async (email) => {
  try {
    const response = await api.get(`/profile/get-user-followers/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (userCredentials) => {
  const formData = new FormData();
  formData.append("profilePicture", {
    uri: userCredentials.profilePicture,
    name: "profilePicture.jpg",
    type: "image/jpg"
  });
  formData.append("backgroundPicture", {
    uri: userCredentials.backgroundPicture,
    name: "backgroundPicture.jpg",
    type: "image/jpg"
  });
  formData.append("header", userCredentials.header);
  formData.append("name", userCredentials.name);
  formData.append("tags", JSON.stringify(userCredentials.tags));
  formData.append("description", userCredentials.description);
  formData.append(
    "isBackgroundPictureSame",
    userCredentials.isBackgroundPictureSame
  );
  formData.append("isProfilePictureSame", userCredentials.isProfilePictureSame);
  // console.log(formData);
  try {
    const response = await api.post(
      `/profile/edit-profile/${email}`,
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

export const toggleOtherEmail = async (email, otherEmail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/toggle-other-email/${email}`,
    //   {
    //     otherEmail
    //   }
    // );
    const response = await api.post(`/profile/toggle-other-email/${email}`, {
      otherEmail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addAsPrimaryEmail = async (email, primaryEmail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/set-primary-email/${email}`,
    //   {
    //     primaryEmail
    //   }
    // );
    const response = await api.post(`/profile/set-primary-email/${email}`, {
      primaryEmail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (email, password, newPassword) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/change-password/${email}`,
    //   {
    //     password,
    //     newPassword
    //   }
    // );
    const response = await api.post(`/profile/change-password/${email}`, {
      password,
      newPassword
    });
    console.log(response.data);
    return response;
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
    // const response = await axios.post(
    //   `${ADDRESS}/profile/edit-profile-picture`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/profile/edit-profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
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
  // const response = await axios.post(
  //   `${ADDRESS}/profile/edit-background-picture`,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }
  // );
  const response = await api.post(
    "/profile/edit-background-picture",
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
  // console.log(email);
  // const response = await axios.get(`${ADDRESS}/profile/get-profile/${email}`);
  const response = await api.get(`/profile/get-profile/${email}`);
  return response.data;
};

export const submitPost = async (data) => {
  const formData = new FormData();
  formData.append("description", data.description);
  formData.append("postedBy", data.postedBy);
  formData.append("image", {
    uri: data.image,
    name: "postImage.jpg",
    type: "image/jpg"
  });
  console.log("api hello");
  console.log(formData);
  try {
    const response = await axios.post(
      `http://192.168.191.254:3500/post/add-post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    // const response = await api.post("/post/add-post", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export async function addIndividualPost(postData) {
  const token = await SecureStorage.getItemAsync("token");
  const formData = new FormData();
  formData.append("description", postData.description);
  formData.append("postedBy", postData.postedBy);

  if (postData.image) {
    formData.append("postMainImage", {
      uri: postData.image,
      name: "postImage.jpg",
      type: "image/jpg"
    });
  }

  try {
    const response = await axios.post(`${ADDRESS}/post/add-post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
        // Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getFeeds = async () => {
  try {
    // const response = await axios.get(`${ADDRESS}/post/get-feeds`);
    const response = await api.get("/post/get-feeds");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (postId) => {
  try {
    const response = await api.get(`/post/get-post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  try {
    // const response = await axios.delete(
    //   `${ADDRESS}/post/delete-post/${postId}`
    // );
    const response = await api.delete(`/post/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShortProfileInfo = async (email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/get-short-profile-info`,
    //   {
    //     email
    //   }
    // );
    const response = await api.post("/profile/get-short-profile-info", {
      email
    });
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
    // const response = await axios.post(`${ADDRESS}/post/like-post`, {
    //   postId,
    //   userId
    // });
    const response = await api.post("/post/like-post", {
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
    // const response = await axios.post(`${ADDRESS}/post/comment-post`, {
    //   postId,
    //   userId,
    //   comment
    // });
    const response = await api.post("/post/comment-post", {
      postId,
      userId,
      comment
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPeople = async () => {
  try {
    // const response = await axios.get(`${ADDRESS}/people/get-people`);
    const response = await api.get("/people/get-people");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCardProfile = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/profile/get-card-profile-info/${email}`
    // );
    const response = await api.get(`/profile/get-card-profile-info/${email}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = async (email, followerEmail) => {
  try {
    // const response = await axios.post(`${ADDRESS}/profile/follow`, {
    //   email,
    //   followerEmail
    // });
    const response = await api.post("/profile/follow", {
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
  formData.append("groupTags", JSON.stringify(data.groupTags));
  formData.append("groupDetails", JSON.stringify(data.groupDetails));
  // console.log(data.groupDetails);
  console.log("====================================");
  console.log(formData);
  console.log("====================================");
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/group/create-group`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/group/create-group", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editGroup = async (data) => {
  const formData = new FormData();

  if (data.groupImage) {
    formData.append("groupImage", {
      uri: data.groupImage,
      name: "groupImage.jpg",
      type: "image/jpg"
    });
  }
  if (data.groupCoverImage) {
    formData.append("groupCoverImage", {
      uri: data.groupCoverImage,
      name: "groupCoverImage.jpg",
      type: "image/jpg"
    });
  }
  formData.append("groupName", data.groupName);
  formData.append("groupDescription", data.groupDescription);
  formData.append("groupAdmins", JSON.stringify(data.groupAdmins));
  formData.append("groupRules", data.groupRules);
  formData.append("groupTags", JSON.stringify(data.groupTags));
  formData.append("groupDetails", JSON.stringify(data.groupDetails));
  formData.append("isGroupImageSame", data.isGroupImageSame);
  formData.append("isGroupCoverImageSame", data.isGroupCoverImageSame);

  try {
    // const response = await axios.post(
    //   `${ADDRESS}/group/edit-group/${data.groupId}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post(
      `/group/edit-group/${data.groupId}`,
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
    // const response = await axios.get(`${ADDRESS}/group/get-groups`);
    const response = await api.get("/group/get-groups");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificGroup = async (groupId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/get-specific-group/${groupId}`
    // );
    const response = await api.get(`/group/get-specific-group/${groupId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const joinThisGroup = async (email, groupId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/join-group/${groupId}/${email}`
    // );
    const response = await api.get(`/group/join-group/${groupId}/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const exitThisGroup = async (email, groupId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/exit-group/${groupId}/${email}`
    // );
    const response = await api.get(`/group/exit-group/${groupId}/${email}`);
    // console.log(response.status);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowedGroups = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/get-followed-groups/${email}`
    // );
    console.log(email);
    const response = await api.get(`/group/get-followed-groups/${email}`);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getManagedGroups = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/get-managed-groups/${email}`
    // );
    const response = await api.get(`/group/get-managed-groups/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGroupPost = async (data) => {
  const formData = new FormData();

  formData.append("description", data.description);
  formData.append("postedBy", data.postedBy);
  formData.append("group", data.group);
  if (data.image) {
    formData.append("image", {
      uri: data.image,
      name: "postImage.jpg",
      type: "image/jpg"
    });
  }
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/group/add-group-post`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/group/add-group-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupFeed = async (groupId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/get-group-feeds/${groupId}`
    // );
    const response = await api.get(`/group/get-group-feeds/${groupId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShortGroupInfo = async (id) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/group/get-short-group-info/${id}`
    // );
    const response = await api.get(`/group/get-short-group-info/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupPost = async (postId) => {
  try {
    // const response = await axios.get(`${ADDRESS}/group/get-group-post/${postId}`);
    const response = await api.get(`/group/get-group-post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const likeGroupPost = async (postId, userId) => {
  try {
    // const response = await axios.post(`${ADDRESS}/group/like-group-post`, {
    //   postId,
    //   userId
    // });
    const response = await api.post("/group/like-group-post", {
      postId,
      userId
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const commentGroupPost = async (postId, userId, comment) => {
  try {
    // const response = await axios.post(`${ADDRESS}/group/comment-group-post`, {
    //   postId,
    //   userId,
    //   comment
    // });
    const response = await api.post("/group/comment-group-post", {
      postId,
      userId,
      comment
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addGroupAdmin = async (groupId, adminMail, adminRole) => {
  try {
    // const response = await axios.post(`${ADDRESS}/group/add-admin/${groupId}`, {
    //   adminMail,
    //   adminRole
    // });
    const response = await api.post(`/group/add-admin/${groupId}`, {
      adminMail,
      adminRole
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeGroupAdmin = async (groupId, adminMail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/group/remove-admin/${groupId}`,
    //   {
    //     adminMail
    //   }
    // );
    const response = await api.post(`/group/remove-admin/${groupId}`, {
      adminMail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeGroupMember = async (groupId, memberMail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/group/remove-member/${groupId}`,
    //   {
    //     memberMail
    //   }
    // );
    const response = await api.post(`/group/remove-member/${groupId}`, {
      memberMail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchGroups = async (query) => {
  try {
    // const response = await axios.post(`${ADDRESS}/group/search-groups`, {
    //   query
    // });
    const response = await api.post("/group/search-groups", {
      query
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = async (data) => {
  const formData = new FormData();
  formData.append("eventCover", {
    uri: data.eventCover,
    name: "eventCover.jpg",
    type: "image/jpg"
  });
  formData.append("eventOrganizer", data.eventOrganizer);
  formData.append("eventName", data.eventName);
  formData.append("eventMode", data.eventMode);
  formData.append("eventDateAndTime", data.eventDateAndTime.toISOString());
  formData.append("eventSpeakers", JSON.stringify(data.eventSpeakers));
  formData.append("eventDescription", data.eventDescription);
  formData.append("isEventCoverSame", data.isEventCoverSame);
  console.log("====================================");
  console.log(formData);
  console.log("====================================");
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/event/create-event`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/event/create-event", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editEvent = async (data) => {
  const formData = new FormData();
  if (data.eventCover) {
    formData.append("eventCover", {
      uri: data.eventCover,
      name: "eventCover.jpg",
      type: "image/jpg"
    });
  }
  // formData.append("eventId", data.eventId);
  formData.append("eventOrganizer", data.eventOrganizer);
  formData.append("eventName", data.eventName);
  formData.append("eventMode", data.eventMode);
  formData.append("eventDateAndTime", data.eventDateAndTime.toISOString());
  formData.append("eventSpeakers", JSON.stringify(data.eventSpeakers));
  formData.append("eventDescription", data.eventDescription);
  formData.append("isEventCoverSame", data.isEventCoverSame);
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/event/edit-event/${data.eventId}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post(
      `/event/edit-event/${data.eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addEventMedia = async (eventMedia, eventId) => {
  const formData = new FormData();
  formData.append("eventMedia", {
    uri: eventMedia,
    name: "eventMedia.mp4",
    type: "video/mp4"
  });
  formData.append("eventId", eventId);
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/event/upload-media`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/event/upload-media", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificEvent = async (eventId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/event/get-specific-event/${eventId}`
    // );
    const response = await api.get(`/event/get-specific-event/${eventId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEventShortInfo = async () => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/event/get-all-short-event-info`
    // );
    const response = await api.get("/event/get-all-short-event-info");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleEventAttendence = async (eventId, email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/event/toggle-event-attendence`,
    //   {
    //     eventId,
    //     email
    //   }
    // );
    const response = await api.post("/event/toggle-event-attendence", {
      eventId,
      email
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addPublisher = async (data) => {
  const formData = new FormData();
  formData.append("publisherImage", {
    uri: data.publisherImage,
    name: "publisherImage.jpg",
    type: "image/jpg"
  });
  formData.append("publisherCoverImage", {
    uri: data.publisherCoverImage,
    name: "publisherCoverImage.jpg",
    type: "image/jpg"
  });
  formData.append("publisherName", data.publisherName);
  formData.append("publisherManager", data.publisherManager);
  formData.append("publisherCategory", data.publisherCategory);
  formData.append("publisherTags", JSON.stringify(data.publisherTags));
  formData.append("editorEmails", JSON.stringify(data.editorEmails));
  formData.append("publisherSocials", JSON.stringify(data.publisherSocials));
  formData.append("publisherDescription", data.publisherDescription);
  // formData

  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/add-publisher`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/editorial/add-publisher", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPublishers = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-publishers/${email}`
    // );
    const response = await api.get(`/editorial/get-publishers/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getManagedPublishers = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-managed-publishers/${email}`
    // );
    const response = await api.get(
      `/editorial/get-managed-publishers/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificPublisher = async (publisherId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-specific-publisher/${publisherId}`
    // );
    const response = await api.get(
      `/editorial/get-specific-publisher/${publisherId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleSubscriber = async (publisherId, email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/toggle-subscriber`,
    //   {
    //     publisherId,
    //     email
    //   }
    // );
    const response = await api.post("/editorial/toggle-subscriber", {
      publisherId,
      email
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addJournal = async (data) => {
  const formData = new FormData();
  formData.append("journalCoverImage", {
    uri: data.journalCoverImage,
    name: "journalCoverImage.jpg",
    type: "image/jpg"
  });
  formData.append("journalTitle", data.journalTitle);
  formData.append("journalDescription", data.journalDescription);
  formData.append(
    "journalPublishingDate",
    data.journalPublishingDate.toISOString()
  );
  formData.append("journalTags", JSON.stringify(data.journalTags));
  formData.append("journalEditorEmail", data.journalEditorEmail);
  formData.append("publisherId", data.publisherId);

  // console.log(data.journalPublishingDate.toISOString());
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/add-journal`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post("/editorial/add-journal", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addChapter = async (data) => {
  try {
    // const response = await axios.post(`${ADDRESS}/editorial/add-chapter`, data);
    const response = await api.post("/editorial/add-chapter", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificJournal = async (journalId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-specific-journal/${journalId}`
    // );
    const response = await api.get(
      `/editorial/get-specific-journal/${journalId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getJournalComments = async (journalId) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-journal-comments/${journalId}`
    // );
    const response = await api.get(
      `/editorial/get-journal-comments/${journalId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addJournalComment = async (data) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/add-journal-comment`,
    //   data
    // );
    const response = await api.post("/editorial/add-journal-comment", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const toggleJournalLike = async (journalId, email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/toggle-journal-like`,
    //   {
    //     journalId,
    //     email
    //   }
    // );
    const response = await api.post("/editorial/toggle-journal-like", {
      journalId,
      email
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const toggleCommentLike = async (commentId, journalId, email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/toggle-comment-like`,
    //   {
    //     journalId,
    //     commentId,
    //     email
    //   }
    // );
    const response = await api.post("/editorial/toggle-comment-like", {
      journalId,
      commentId,
      email
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSubscribedJournals = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/editorial/get-subscribed-publisher-journals/${email}`
    // );

    const response = await api.get(
      `/editorial/get-subscribed-publisher-journals/${email}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editPublisher = async (data) => {
  const formData = new FormData();
  formData.append("publisherImage", {
    uri: data.publisherImage,
    name: "publisherImage.jpg",
    type: "image/jpg"
  });
  formData.append("publisherCoverImage", {
    uri: data.publisherCoverImage,
    name: "publisherCoverImage.jpg",
    type: "image/jpg"
  });
  formData.append("publisherName", data.publisherName);
  formData.append("publisherManager", data.publisherManager);
  formData.append("publisherCategory", data.publisherCategory);
  formData.append("publisherTags", JSON.stringify(data.publisherTags));
  formData.append("editorEmails", JSON.stringify(data.editorEmails));
  formData.append("publisherSocials", JSON.stringify(data.publisherSocials));
  formData.append("publisherDescription", data.publisherDescription);
  formData.append("publisherId", data.publisherId);
  formData.append("isPublisherImageSame", data.isPublisherImageSame);
  formData.append("isPublisherCoverImageSame", data.isPublisherCoverImageSame);
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/edit-publisher/${data.publisherId}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post(
      `/editorial/edit-publisher/${data.publisherId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeEditor = async (publisherId, editorEmail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/remove-editor/${publisherId}`,
    //   {
    //     editorEmail
    //   }
    // );
    const response = await api.post(`/editorial/remove-editor/${publisherId}`, {
      editorEmail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addEditor = async (publisherId, editorEmail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/add-editor/${publisherId}`,
    //   {
    //     editorEmail
    //   }
    // );
    const response = await api.post(`/editorial/add-editor/${publisherId}`, {
      editorEmail
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editJournal = async (data) => {
  const formData = new FormData();
  formData.append("journalCoverImage", {
    uri: data.journalCoverImage,
    name: "journalCoverImage.jpg",
    type: "image/jpg"
  });
  formData.append("journalTitle", data.journalTitle);
  formData.append("journalDescription", data.journalDescription);
  formData.append(
    "journalPublishingDate",
    data.journalPublishingDate.toISOString()
  );
  formData.append("journalTags", JSON.stringify(data.journalTags));
  formData.append("journalEditorEmail", data.journalEditorEmail);
  formData.append("journalId", data.journalId);
  formData.append("isJournalCoverImageSame", data.isJournalCoverImageSame);
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/edit-journal/${data.journalId}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post(
      `/editorial/edit-journal/${data.journalId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJournal = async (journalId) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/delete-journal/${journalId}`
    // );
    const response = await api.post(`/editorial/delete-journal/${journalId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeSubscriber = async (publisherId, subscriberEmail) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/remove-subscriber/${publisherId}`,
    //   {
    //     subscriberEmail
    //   }
    // );
    const response = await api.post(
      `/editorial/remove-subscriber/${publisherId}`,
      {
        subscriberEmail
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deletePublisher = async (publisherId) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/delete-publisher/${publisherId}`
    // );
    const response = await api.post(
      `/editorial/delete-publisher/${publisherId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addStory = async (email, story) => {
  const formData = new FormData();
  formData.append("story", {
    uri: story,
    name: "story.jpg",
    type: "image/jpg"
  });
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/add-story/${email}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    const response = await api.post(`/profile/add-story/${email}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMyStories = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/profile/get-my-stories/${email}`
    // );
    const response = await api.get(`/profile/get-my-stories/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingStories = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/profile/get-following-stories/${email}`
    // );
    const response = await api.get(`/profile/get-following-stories/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addStoryView = async (email, storyUserEmail, storyId) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/profile/add-story-view/${email}`,
    //   {
    //     storyUserEmail,
    //     storyId
    //   }
    // );
    const response = await api.post(`/profile/add-story-view/${email}`, {
      storyUserEmail,
      storyId
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStories = async (email) => {
  try {
    // const response = await axios.get(
    //   `${ADDRESS}/profile/get-all-stories/${email}`
    // );
    const response = await api.get(`/profile/get-all-stories/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchPublishers = async (query, email) => {
  try {
    // const response = await axios.post(
    //   `${ADDRESS}/editorial/search-publishers/:${email}`,
    //   {
    //     query
    //   }
    // );
    const response = await api.post(`/editorial/search-publishers/:${email}`, {
      query
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
