import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKeywordCommentOn: false,
  isKeywordOn: false,
};

const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    keywordCommentOn(state) {
      state.isKeywordCommentOn = true;
    },
    keywordCommentOff(state) {
      state.isKeywordCommentOn = false;
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
