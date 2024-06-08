import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import {
  addGroupPost,
  addIndividualPost,
  getHeadlines,
  submitPost
} from "../api/apis";
import axios from "axios";

const ADDRESS = "http://192.168.191.254:3500";

export const postFormData = createAsyncThunk(
  "post/postFormData",
  async (postData) => {
    const token = await SecureStorage.getItemAsync("token");
    console.log("herllo");
    const formData = new FormData();
    formData.append("description", postData.description);
    formData.append("postedBy", postData.postedBy);
    formData.append("image", postData.image);
    // const response = await submitPost(postData);
    const response = await addIndividualPost(postData);
    // const response = await axios.post(`${ADDRESS}/post/add-post`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     // Authorization: `Bearer ${token}`
    //   }
    // });
    // console.log(formData);
    // console.log(response);
    return response;
  }
);

export const postGroupFormData = createAsyncThunk(
  "post/postGroupFormData",
  async (postData) => {
    const response = await addGroupPost(postData);
    console.log(response);
    console.log(postData);
    return response;
  }
);

// export const fetchEmail = createAsyncThunk("post/fetchEmail", async () => {
//   const email = await SecureStorage.getItemAsync("email");
//   return email;
// });

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: {
      description: "",
      postedBy: "",
      image: null
    },
    selectVisibility: false,
    postVisibility: {
      anyone: false,
      followersOnly: false,
      groups: false
    },
    selectedGroup: "",
    loading: false,
    error: "",
    switch: false
  },
  reducers: {
    updatePostData: (state, action) => {
      state.postData.description = action.payload.description;
      state.postData.image = action.payload.image;
      state.postData.postedBy = action.payload.postedBy;
    },
    updateSwitch: (state, action) => {
      state.switch = action.payload;
    },
    updatePostVisibility: (state, action) => {
      state.selectVisibility = action.payload;
    },
    updatePostVisibilityOption: (state, action) => {
      for (let key in state.postVisibility) {
        state.postVisibility[key] = false;
      }
      state.postVisibility[action.payload] = true;
    },
    updateSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFormData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFormData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchEmail.fulfilled, (state, action) => {
      //   state.postData.postedBy = action.payload;
      // })
      .addCase(postGroupFormData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGroupFormData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postGroupFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { post } = postSlice.actions;
export default postSlice.reducer;
