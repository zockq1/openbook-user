import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
