import { createSlice } from "@reduxjs/toolkit";
import { ContentModel } from "../../types/chapterTypes";

interface ContentState {
  contentList: ContentModel[];
  currentContent: number;
  currentTopic: string;
}

const initialState: ContentState = {
  contentList: [{ content: "", title: "", state: "open" }],
  currentContent: 0,
  currentTopic: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    setContentList: (state, action) => {
      state.contentList = action.payload;
    },
  },
});

export const { setCurrentContent, setCurrentTopic, setContentList } =
  contentSlice.actions;

export default contentSlice.reducer;
