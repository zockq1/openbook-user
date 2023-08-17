import { createSlice } from "@reduxjs/toolkit";

interface ContentState {
  contentList: string[];
  currentContent: string;
  currentTopic: string;
}

const initialState: ContentState = {
  contentList: [
    "단원 학습",
    "연표 학습",
    "연표 문제",
    "키워드 보고 주제 맞추기",
  ],
  currentContent: "단원 학습",
  currentTopic: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
      if (state.currentContent.startsWith("주제 학습/")) {
        state.currentTopic = state.currentContent.substring(
          "주제 학습/".length
        );
      } else if (state.currentContent.startsWith("주제 보고 키워드 맞추기/")) {
        state.currentTopic = state.currentContent.substring(
          "주제 보고 키워드 맞추기/".length
        );
      } else if (state.currentContent.startsWith("주제 보고 문장 맞추기/")) {
        state.currentTopic = state.currentContent.substring(
          "주제 보고 문장 맞추기/".length
        );
      }
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    updateContentListWithTopics: (state, action) => {
      const topicList = action.payload;
      const updatedTopicList = [];
      for (const topic of topicList) {
        updatedTopicList.push(`주제 학습/${topic}`);
        updatedTopicList.push(`주제 보고 키워드 맞추기/${topic}`);
        updatedTopicList.push(`주제 보고 문장 맞추기/${topic}`);
      }
      state.contentList = [
        "단원 학습",
        "연표 학습",
        "연표 문제",
        ...updatedTopicList,
        "키워드 보고 주제 맞추기",
      ];
    },
  },
});

export const {
  setCurrentContent,
  setCurrentTopic,
  updateContentListWithTopics,
} = contentSlice.actions;

export default contentSlice.reducer;
