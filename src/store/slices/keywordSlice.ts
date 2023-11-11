import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentOn: false,
  isKeywordOn: false,
  isTopicOn: false,
};

const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    CommentOn(state) {
      state.isCommentOn = true;
    },
    CommentOff(state) {
      state.isCommentOn = false;
    },
    keywordOn(state) {
      state.isKeywordOn = true;
    },
    keywordOff(state) {
      state.isKeywordOn = false;
    },
    topicOn(state) {
      state.isTopicOn = true;
    },
    topicOff(state) {
      state.isTopicOn = false;
    },
  },
});

export const {
  CommentOff,
  CommentOn,
  keywordOff,
  keywordOn,
  topicOff,
  topicOn,
} = keywordSlice.actions;
export default keywordSlice.reducer;
