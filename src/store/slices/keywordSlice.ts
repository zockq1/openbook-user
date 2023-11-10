import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentOn: false,
  isKeywordOn: false,
};

const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    keywordCommentOn(state) {
      state.isCommentOn = true;
    },
    keywordCommentOff(state) {
      state.isCommentOn = false;
    },
    keywordOn(state) {
      state.isKeywordOn = true;
    },
    keywordOff(state) {
      state.isKeywordOn = false;
    },
  },
});

export const { keywordCommentOff, keywordCommentOn, keywordOff, keywordOn } =
  keywordSlice.actions;
export default keywordSlice.reducer;
