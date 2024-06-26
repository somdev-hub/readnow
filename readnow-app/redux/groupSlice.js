import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStorage from "expo-secure-store";
import { createGroup, editGroup } from "../api/apis";

export const postGroupData = createAsyncThunk(
  "group/postGroupData",
  async (groupData) => {
    // console.log(groupData);
    const response = await createGroup(groupData);
    return response;
  }
);

export const fetchEmail = createAsyncThunk("group/fetchEmail", async () => {
  const email = await SecureStorage.getItemAsync("email");
  return email;
});

export const editGroupData = createAsyncThunk(
  "group/editGroupData",
  async (groupData) => {
    console.log(groupData);
    // console.log(groupData.groupId);
    const response = await editGroup(groupData);
    return response;
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupData: {
      groupName: "",
      groupDescription: "",
      groupAdmins: [],
      groupRules: "",
      groupTags: [],
      groupDetails: {
        groupLocation: "",
        groupVisibility: "",
        groupGenre: []
      },
      groupImage: null,
      groupCoverImage: null,
      isGroupImageSame: true,
      isGroupCoverImageSame: true,
      groupId: null
    },
    groupGenresDone: false,
    groupGenres: [],
    loading: false,
    error: "",
    isEditedGroup: false
  },
  reducers: {
    updateGroupData: (state, action) => {
      state.groupData.groupName = action.payload.groupName;
      state.groupData.groupDescription = action.payload.groupDescription;
      state.groupData.groupAdmins = action.payload.groupAdmins;
      state.groupData.groupRules = action.payload.groupRules;
      state.groupData.groupTags = action.payload.groupTags;
      state.groupData.groupDetails.groupLocation =
        action.payload.groupDetails.groupLocation;
      state.groupData.groupDetails.groupVisibility =
        action.payload.groupDetails.groupVisibility;
      state.groupData.groupDetails.groupGenre =
        action.payload.groupDetails.groupGenre;
      state.groupData.groupImage = action.payload.groupImage;
      state.groupData.groupCoverImage = action.payload.groupCoverImage;
      state.groupData.isGroupImageSame = action.payload.isGroupImageSame;
      state.groupData.isGroupCoverImageSame =
        action.payload.isGroupCoverImageSame;
      state.groupData.groupId = action.payload.groupId;
    },
    updateGroupGenres: (state, action) => {
      // state.groupGenresDone = action.payload;
      state.groupGenres = action.payload;
    },
    updateGroupGenresDone: (state, action) => {
      state.groupGenresDone = action.payload;
    },
    updateGroupEditMode: (state, action) => {
      state.isEditedGroup = action.payload;
    }
    // updateGroupId: (state, action) => {
    //   state.groupId = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.groupData.groupAdmins.push({
          user: action.payload,
          role: "owner"
        });
      })
      .addCase(fetchEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postGroupData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGroupData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editGroupData.fulfilled, (state, action) => {
        state.loading = false;
        state.isEditedGroup = true;
      });
  }
});

export const { updateGroupData } = groupSlice.actions;
export default groupSlice.reducer;
