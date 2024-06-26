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
      group: false
    },
    alertModel: {
      visible: false,
      title: "",
      message: ""
    },
    selectedGroup: "",
    loading: false,
    error: "",
    switch: false,
    postSnackbar: {
      visible: false,
      message: ""
    },
    postSuccess: false
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
    },
    updateAlertModel: (state, action) => {
      state.alertModel.visible = action.payload.visible;
      state.alertModel.title = action.payload.title;
      state.alertModel.message = action.payload.message;
    },
    updatePostSnackbar: (state, action) => {
      state.postSnackbar.visible = action.payload.visible;
      state.postSnackbar.message = action.payload.message;
    },
    updatePostSuccess: (state, action) => {
      state.postSuccess = action.payload;
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
        if (action.payload.status === 200) {
          state.postSuccess = true;
        } else {
          state.postSuccess = false;
          state.postSnackbar.visible = true;
          state.postSnackbar.message = action.payload.message;
        }
      })
      .addCase(postFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
