import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPublisher, createEvent } from "../api/apis";

export const postPublisherData = createAsyncThunk(
  "publisher/postPublisherData",
  async (publisherData) => {
    try {
      // console.log("hello");
      const response = await addPublisher(publisherData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const publisherSlice = createSlice({
  name: "publisher",
  initialState: {
    publisherData: {
      publisherManager: "",
      publisherName: "",
      publisherCategory: "",
      publisherTags: [],
      editorEmails: [],
      publisherSocials: {
        twitter: "",
        facebook: "",
        instagram: "",
        website: ""
      },
      publisherDescription: "",
      publisherImage: "",
      publisherCoverImage: ""
    },
    publisherSnackbar: false,
    publisherSnackbarMessage: ""
  },
  reducers: {
    updatePublisherData: (state, action) => {
      state.publisherData = action.payload;
    },
    updateSnackbarVisibility: (state, action) => {
      state.publisherSnackbar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postPublisherData.fulfilled, (state, action) => {
      if (action?.payload?.status === 201) {
        state.publisherSnackbar = true;
        state.publisherSnackbarMessage = "Publisher added successfully";
      } else {
        state.publisherSnackbar = true;
        state.publisherSnackbarMessage = "Internal server error";
      }
    });
  }
});

export default publisherSlice.reducer;