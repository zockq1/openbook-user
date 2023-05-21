import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    solved: 0,
    wrong: 0,
    correct: 0,
  },
  reducers: {
    incrementSolved(state) {
      state.solved++;
    },
    incrementWrong(state) {
      state.wrong++;
    },
    incrementCorrect(state) {
      state.correct++;
    },
  },
});

export const { incrementSolved, incrementWrong, incrementCorrect } =
  quizSlice.actions;
export default quizSlice.reducer;
