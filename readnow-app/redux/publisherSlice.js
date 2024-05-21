import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPublisher, createEvent, editPublisher } from "../api/apis";

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

export const editPublisherData = createAsyncThunk(
  "publisher/editPublisherData",
  async (publisherData) => {
    try {
      const response = await editPublisher(publisherData);
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
      publisherCoverImage: "",
      isPublisherImageSame: false,
      isPublisherCoverImageSame: false,
      publisherId: ""
    },
    publisherSnackbar: false,
    publisherSnackbarMessage: "",
    isEditedPublisher: false
  },
  reducers: {
    updatePublisherData: (state, action) => {
      state.publisherData.publisherManager = action.payload.publisherManager;
      state.publisherData.publisherName = action.payload.publisherName;
      state.publisherData.publisherCategory = action.payload.publisherCategory;
      state.publisherData.publisherTags = action.payload.publisherTags;
      state.publisherData.editorEmails = action.payload.editorEmails;
      state.publisherData.publisherSocials = action.payload.publisherSocials;
      state.publisherData.publisherDescription =
        action.payload.publisherDescription;
      state.publisherData.publisherImage = action.payload.publisherImage;
      state.publisherData.publisherCoverImage =
        action.payload.publisherCoverImage;
      state.publisherData.isPublisherImageSame =
        action.payload.isPublisherImageSame;
      state.publisherData.isPublisherCoverImageSame =
        action.payload.isPublisherCoverImageSame;
      state.publisherData.publisherId = action.payload.publisherId;
    },
    updateSnackbarVisibility: (state, action) => {
      state.publisherSnackbar = action.payload;
    },
    updateIsEditedPublisher: (state, action) => {
      state.isEditedPublisher = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPublisherData.fulfilled, (state, action) => {
        if (action?.payload?.status === 201) {
          state.publisherSnackbar = true;
          state.publisherSnackbarMessage = "Publisher added successfully";
        } else {
          state.publisherSnackbar = true;
          state.publisherSnackbarMessage = "Internal server error";
        }
      })
      .addCase(editPublisherData.fulfilled, (state, action) => {
        if (action?.payload?.status === 200) {
          state.publisherSnackbar = true;
          state.publisherSnackbarMessage = "Publisher edited successfully";
          state.isEditedPublisher = true;
        } else {
          state.publisherSnackbar = true;
          state.publisherSnackbarMessage = "Internal server error";
        }
      });
  }
});

export default publisherSlice.reducer;
