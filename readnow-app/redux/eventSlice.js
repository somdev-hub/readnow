import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import { createEvent, editEvent } from "../api/apis";

export const postEventData = createAsyncThunk(
  "event/postEventData",
  async (eventData) => {
    const response = await createEvent(eventData);
    return response;
  }
);

export const editEventData = createAsyncThunk(
  "event/editEventData",
  async (eventData) => {
    const response = await editEvent(eventData);
    return response;
  }
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
      eventMedia: null,
      eventId: null,
      isEventCoverSame: false
    },
    isEditedEvent: false,
    eventSnackbar: false,
    eventSocket: false,
    currentEventId: null,
    eventUpdationMessage: ""
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
      state.eventdata.eventId = action.payload.eventId
        ? action.payload.eventId
        : null;

      state.eventdata.isEventCoverSame = action.payload.isEventCoverSame;
    },
    updateEventMedia: (state, action) => {
      state.eventdata.eventMedia = action.payload;
    },
    updateSnackbarVisibility: (state, action) => {
      state.eventSnackbar = action.payload;
    },
    updateEventSocket: (state, action) => {
      state.eventSocket = action.payload;
    },
    updateCurrentEventId: (state, action) => {
      state.currentEventId = action.payload;
    },
    updateEditedEvent: (state, action) => {
      state.isEditedEvent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postEventData.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        // console.log("extra reducers fulfilled");
        state.eventSnackbar = true;
        state.eventUpdationMessage = action.payload.data.message;
        state.currentEventId = action.payload.data.id;
      }
    });
    builder.addCase(editEventData.fulfilled, (state, action) => {
      console.log("builder case");
      if (action?.payload?.status === 200) {
        console.log("update successful");
        state.isEditedEvent = true;
        state.eventSnackbar = true;
        state.eventUpdationMessage = action.payload.data.message;
        state.currentEventId = action.payload.data.id;
      }
    });
  }
});

export const { updateEventData } = eventSlice.actions;
export default eventSlice.reducer;
