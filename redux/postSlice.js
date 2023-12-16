import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import { getHeadlines, submitPost } from "../api/apis";
import axios from "axios";

const ADDRESS = "http://192.168.33.115:3500";

export const postFormData = createAsyncThunk(
  "post/postFormData",
  async (postData) => {
    const formData = new FormData();
    formData.append("description", postData.description);
    formData.append("postedBy", postData.postedBy);

    const res = await fetch(postData.image);
    formData.append("image", postData.image);
    const response = await submitPost(postData);
    console.log(formData);
    console.log(response);
    return response;
  }
);

export const fetchEmail = createAsyncThunk("post/fetchEmail", async () => {
  const email = await SecureStorage.getItemAsync("email");
  return email;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: {
      description: "",
      postedBy: "",
      image: null
    },
    loading: false,
    error: "",
    switch: false
  },
  reducers: {
    updatePostData: (state, action) => {
      state.postData.description = action.payload.description;
      state.postData.image = action.payload.image;
    },
    updateSwitch: (state, action) => {
      state.switch = action.payload;
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
      .addCase(fetchEmail.fulfilled, (state, action) => {
        state.postData.postedBy = action.payload;
      });
  }
});

export const { post } = postSlice.actions;
export default postSlice.reducer;
