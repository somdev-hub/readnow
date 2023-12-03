import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";

export const fetchEmail = createAsyncThunk("bookmark/fetchEmail", async () => {
  const email = await SecureStorage.getItemAsync("email");
  return email;
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: null,
    email: "",
    type: ""
  },

  reducers: {
    addBookmark: (state, action) => {
      state.bookmark = action.payload.bookmark;
      state.email = action.payload.email;
      state.type = action.payload.type;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmail.fulfilled, (state, action) => {
      state.email = action.payload;
    });
  }
});

export const { addBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
