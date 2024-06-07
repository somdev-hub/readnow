import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    reRouteToLogin: false,
    isLoggedIn: true
  },
  reducers: {
    updateReRouteToLogin: (state, action) => {
      state.reRouteToLogin = action.payload;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  }
});

export const { updateReRouteToLogin, updateIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
