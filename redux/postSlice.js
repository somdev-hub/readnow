import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import { getHeadlines, submitPost } from "../api/apis";

export const postFormData = createAsyncThunk(
  "post/postFormData",
  async (postData) => {
    const formData = new FormData();
    formData.append("description", postData.description);
    formData.append("postedBy", postData.postedBy);
    formData.append("image", {
        uri: postData.image,
        name: "postImage.jpg",
        type: "image/jpg"
    });
    const response = await submitPost(formData);
    // const response = await getHeadlines();
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
    error: ""
  },
  reducers: {
    updatePostData: (state, action) => {
      state.postData.description = action.payload.description;
      state.postData.image = action.payload.image;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFormData.pending, (state, action) => {
        // state.postData = action.payload;
        state.loading = true;
        state.error = null;
      })
      .addCase(postFormData.fulfilled, (state, action) => {
        // state.postData = action.payload;
        state.loading = false;
        // state.error = action.payload
      })
      .addCase(postFormData.rejected, (state, action) => {
        // state.postData = action.payload;
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { post } = postSlice.actions;
export default postSlice.reducer;
