import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import bookmarkReducer from "./bookmarkSlice";
import notifyReducer from "./notifySlice";
import groupReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    bookmark: bookmarkReducer,
    notify: notifyReducer,
    group: groupReducer
  }
});
