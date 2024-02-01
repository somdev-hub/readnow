import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventdata: {
      eventOrganizer: "",
      eventName: "",
      eventMode: "video",
      eventDateAndTime: new Date(),
      eventSpeakers: [],
      eventDescription: "",
      eventCover: null
    }
  },
  reducers: {
    updateEventData: (state, action) => {
      state.eventdata.eventOrganizer = action.payload.eventOrganizer;
      state.eventdata.eventName = action.payload.eventName;
      state.eventdata.eventMode = action.payload.eventMode;
      state.eventdata.eventDateAndTime = action.payload.eventDateAndTime;
      state.eventdata.eventSpeakers = action.payload.eventSpeakers;
      state.eventdata.eventDescription = action.payload.eventDescription;
      state.eventdata.eventCover = action.payload.eventCover;
    }
  }
});

export const { updateEventData } = eventSlice.actions;
export default eventSlice.reducer;
