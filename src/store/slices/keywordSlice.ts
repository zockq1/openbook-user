import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKeywordCommentOn: false,
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
  },
});

export const { keywordCommentOff, keywordCommentOn } = keywordSlice.actions;
export default keywordSlice.reducer;
