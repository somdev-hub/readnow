import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journaldata: {
      journalTitle: "",
      journalContent: "",
      journalId: null
    },
    isEditedJournal: false,
    journalSnackbar: false,
    currentJournalId: null,
    journalUpdationMessage: "",
    publishJournal: false
  },
  reducers: {
    updatePublishJournal: (state, action) => {
      state.publishJournal = action.payload;
    }
  }
});

export default journalSlice.reducer;
