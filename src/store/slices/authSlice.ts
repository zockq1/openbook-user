import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: "",
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.refreshToken = "";
      state.accessToken = "";
      state.id = "";
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setRefreshToken, setId } =
  authSlice.actions;
export default authSlice.reducer;
