import axios from "axios";
import { io } from "socket.io-client";

const ADDRESS = "http://192.168.159.254:3500";

export const socket = io(ADDRESS, {
  transports: ["websocket"]
});

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
    const response = await axios.get(
      `${ADDRESS}/profile/get-user-followers/${email}`
    );
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
    const response = await axios.post(
      `${ADDRESS}/profile/edit-profile/${userCredentials.email}`,
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

export const getCardProfile = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/profile/get-card-profile-info/${email}`
    );
    return response.data.data;
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

export const editGroup = async (data) => {
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
  formData.append("isGroupImageSame", data.isGroupImageSame);
  formData.append("isGroupCoverImageSame", data.isGroupCoverImageSame);

  try {
    const response = await axios.post(
      `${ADDRESS}/group/edit-group/${data.groupId}`,
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

export const addGroupPost = async (data) => {
  const formData = new FormData();

  formData.append("description", data.description);
  formData.append("postedBy", data.postedBy);
  formData.append("group", data.group);
  formData.append("image", {
    uri: data.image,
    name: "postImage.jpg",
    type: "image/jpg"
  });
  try {
    const response = await axios.post(
      `${ADDRESS}/group/add-group-post`,
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

export const getGroupFeed = async (groupId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/get-group-feeds/${groupId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShortGroupInfo = async (id) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/group/get-short-group-info/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const likeGroupPost = async (postId, userId) => {
  try {
    const response = await axios.post(`${ADDRESS}/group/like-group-post`, {
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
    const response = await axios.post(`${ADDRESS}/group/comment-group-post`, {
      postId,
      userId,
      comment
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGroupAdmin = async (groupId, adminMail, adminRole) => {
  try {
    const response = await axios.post(`${ADDRESS}/group/add-admin/${groupId}`, {
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
    const response = await axios.post(
      `${ADDRESS}/group/remove-admin/${groupId}`,
      {
        adminMail
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeGroupMember = async (groupId, memberMail) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/group/remove-member/${groupId}`,
      {
        memberMail
      }
    );
    return response;
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
    const response = await axios.post(
      `${ADDRESS}/event/create-event`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editEvent = async (data) => {
  const formData = new FormData();
  formData.append("eventCover", {
    uri: data.eventCover,
    name: "eventCover.jpg",
    type: "image/jpg"
  });
  // formData.append("eventId", data.eventId);
  formData.append("eventOrganizer", data.eventOrganizer);
  formData.append("eventName", data.eventName);
  formData.append("eventMode", data.eventMode);
  formData.append("eventDateAndTime", data.eventDateAndTime.toISOString());
  formData.append("eventSpeakers", JSON.stringify(data.eventSpeakers));
  formData.append("eventDescription", data.eventDescription);
  formData.append("isEventCoverSame", data.isEventCoverSame);
  try {
    const response = await axios.post(
      `${ADDRESS}/event/edit-event/${data.eventId}`,
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
    const response = await axios.post(
      `${ADDRESS}/event/upload-media`,
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

export const getSpecificEvent = async (eventId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/event/get-specific-event/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEventShortInfo = async () => {
  try {
    const response = await axios.get(
      `${ADDRESS}/event/get-all-short-event-info`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleEventAttendence = async (eventId, email) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/event/toggle-event-attendence`,
      {
        eventId,
        email
      }
    );
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
    const response = await axios.post(
      `${ADDRESS}/editorial/add-publisher`,
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

export const getPublishers = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-publishers/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getManagedPublishers = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-managed-publishers/${email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificPublisher = async (publisherId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-specific-publisher/${publisherId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleSubscriber = async (publisherId, email) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/toggle-subscriber`,
      {
        publisherId,
        email
      }
    );
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
    const response = await axios.post(
      `${ADDRESS}/editorial/add-journal`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addChapter = async (data) => {
  try {
    const response = await axios.post(`${ADDRESS}/editorial/add-chapter`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificJournal = async (journalId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-specific-journal/${journalId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getJournalComments = async (journalId) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-journal-comments/${journalId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addJournalComment = async (data) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/add-journal-comment`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const toggleJournalLike = async (journalId, email) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/toggle-journal-like`,
      {
        journalId,
        email
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const toggleCommentLike = async (commentId, journalId, email) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/toggle-comment-like`,
      {
        journalId,
        commentId,
        email
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSubscribedJournals = async (email) => {
  try {
    const response = await axios.get(
      `${ADDRESS}/editorial/get-subscribed-publisher-journals/${email}`
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
    const response = await axios.post(
      `${ADDRESS}/editorial/edit-publisher/${data.publisherId}`,
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
    const response = await axios.post(
      `${ADDRESS}/editorial/remove-editor/${publisherId}`,
      {
        editorEmail
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addEditor = async (publisherId, editorEmail) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/add-editor/${publisherId}`,
      {
        editorEmail
      }
    );
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
    const response = await axios.post(
      `${ADDRESS}/editorial/edit-journal/${data.journalId}`,
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
    const response = await axios.post(
      `${ADDRESS}/editorial/delete-journal/${journalId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const removeSubscriber = async (publisherId, subscriberEmail) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/editorial/remove-subscriber/${publisherId}`,
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
    const response = await axios.post(
      `${ADDRESS}/editorial/delete-publisher/${publisherId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
