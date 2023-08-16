import { createSlice } from "@reduxjs/toolkit";

interface ProgressState {
  progressList: string[];
  currentProgress: string;
  currentTopic: string;
}

const initialState: ProgressState = {
  progressList: [
    "단원 학습",
    "연표 학습",
    "연표 문제",
    "키워드 보고 주제 맞추기",
  ],
  currentProgress: "단원 학습",
  currentTopic: "",
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setCurrentProgress: (state, action) => {
      state.currentProgress = action.payload;
      if (state.currentProgress.startsWith("주제 학습/")) {
        state.currentTopic = state.currentProgress.substring(
          "주제 학습/".length
        );
      } else if (state.currentProgress.startsWith("주제 보고 키워드 맞추기/")) {
        state.currentTopic = state.currentProgress.substring(
          "주제 보고 키워드 맞추기/".length
        );
      } else if (state.currentProgress.startsWith("주제 보고 문장 맞추기/")) {
        state.currentTopic = state.currentProgress.substring(
          "주제 보고 문장 맞추기/".length
        );
      }
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    updateProgressListWithTopics: (state, action) => {
      const topicList = action.payload;
      const updatedTopicList = [];
      for (const topic of topicList) {
        updatedTopicList.push(`주제 학습/${topic}`);
        updatedTopicList.push(`주제 보고 키워드 맞추기/${topic}`);
        updatedTopicList.push(`주제 보고 문장 맞추기/${topic}`);
      }
      state.progressList = [
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
  setCurrentProgress,
  setCurrentTopic,
  updateProgressListWithTopics,
} = progressSlice.actions;

export default progressSlice.reducer;
