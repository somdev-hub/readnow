import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import bookmarkReducer from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    bookmark: bookmarkReducer
  }
});
