import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import { createEvent } from "../api/apis";

export const postEventData = createAsyncThunk(
  "event/postEventData",
  async (eventData) => {
    const response = await createEvent(eventData);
    return response;
  }

  // async (eventData) => {
  //   const dummyResponse = {
  //     status: 200,
  //     data: {
  //       id: "dummyId"
  //     }
  //   };

  //   return dummyResponse;
  // }
);

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
      eventCover: null,
      eventMedia: null
    },
    eventSnackbar: false,
    currentEventId: null
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
    },
    updateEventMedia: (state, action) => {
      state.eventdata.eventMedia = action.payload;
    },
    updateSnackbarVisibility: (state, action) => {
      state.eventSnackbar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postEventData.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        // console.log("extra reducers fulfilled");
        state.eventSnackbar = true;
        state.currentEventId = action.payload.data.id;
      }
    });
  }
});

export const { updateEventData } = eventSlice.actions;
export default eventSlice.reducer;
