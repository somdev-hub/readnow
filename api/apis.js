import axios from "axios";

const ADDRESS = "http://192.168.39.254:3500";

const getHeadlines = async () => {
  const response = await axios.get(`${ADDRESS}/get-headlines`);
  return response.data;
};

const searchHeadlines = async (query) => {
  const response = await axios.get(`${ADDRESS}/search/${query}`);
  return response.data;
};

const signup = async (userCredentials) => {
  try {
    const response = await axios.post(`${ADDRESS}/add-user`, userCredentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userCredentials) => {
  try {
    const response = await axios.post(`${ADDRESS}/login`, userCredentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (userCredentials) => {
  try {
    const response = await axios.post(
      `${ADDRESS}/edit-profile`,
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
      `${ADDRESS}/edit-profile-picture`,
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
  formData.append("backgroundPicture", data.image);
  formData.append("email", data.email);
  const response = await axios.post(
    `${ADDRESS}/edit-background-picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

export {
  getHeadlines,
  searchHeadlines,
  signup,
  login,
  editProfile,
  editProfilePicture,
  editBackgroundPicture
};
