import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const notitfySlice = createSlice({
  name: "notify",
  initialState: {
    addedToBookmark: false,
    addedToNewsBookmark: false,
    deletedFromBookmark: false,
    addedPost: false,
    deletedPost: false
  },
  reducers: {
    addBookmark: (state, action) => {
      state.addedToBookmark = action.payload;
    },
    addNewsBookmark: (state, action) => {
      state.addedToNewsBookmark = action.payload;
    },
    deleteBookmark: (state, action) => {
      state.deletedFromBookmark = action.payload;
    },
    addPost: (state, action) => {
      state.addedPost = action.payload;
    },
    deletePost: (state, action) => {
      state.deletedPost = action.payload;
    }
  }
});

export const { addBookmark, deleteBookmark, addPost, deletePost } =
  notitfySlice.actions;
export default notitfySlice.reducer;
