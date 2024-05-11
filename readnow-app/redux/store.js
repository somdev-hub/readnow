import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import bookmarkReducer from "./bookmarkSlice";
import notifyReducer from "./notifySlice";
import groupReducer from "./groupSlice";
import eventReducer from "./eventSlice";
import journalReducer from "./journalSlice";
import publisherReducer from "./publisherSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    bookmark: bookmarkReducer,
    notify: notifyReducer,
    group: groupReducer,
    event: eventReducer,
    journal: journalReducer,
    publisher: publisherReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});
