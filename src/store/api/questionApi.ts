import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ExamModel,
  GetQuestionModel,
  QuestionModel,
  RoundModel,
  TimeLineModel,
  WrongCounterModel,
} from "../../types/questionTypes";
import baseQueryWithJWT from "./baseApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getRounds: builder.query<RoundModel[], void>({
      query: () => "/rounds",
    }),
    getTimeline: builder.query<TimeLineModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/time-flow/?id=${chapterNumber}`,
    }),
    getTtoKQuestion: builder.query<QuestionModel[], string>({
      query: (topicTitle: string) =>
        `/questions/get-keywords/?title=${topicTitle}`,
    }),
    getRandomQuestion: builder.query<QuestionModel[], GetQuestionModel>({
      query: (getQuestion) =>
        `/questions/random?num=${getQuestion.chapterNumber}&count=${getQuestion.numberOfQuestion}`,
    }),
    getKtoTQuestion: builder.query<QuestionModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/get-topics-keywords/?num=${chapterNumber}`,
    }),
    getExam: builder.query<ExamModel[], number>({
      query: (roundNumber: number) => `/rounds/${roundNumber}/questions`,
    }),
    updateTimelineWrongCounter: builder.mutation<void, WrongCounterModel>({
      query: (counter: WrongCounterModel) => {
        return {
          url: `/timeline/wrong-count`,
          method: "PATCH",
          body: counter,
        };
      },
    }),
    updateKeywordWrongCounter: builder.mutation<void, WrongCounterModel[]>({
      query: (counterList: WrongCounterModel[]) => {
        return {
          url: `/keyword/wrong-count`,
          method: "PATCH",
          body: counterList,
        };
      },
    }),
  }),
});

export const {
  useGetRoundsQuery,
  useGetTimelineQuery,
  useGetExamQuery,
  useGetRandomQuestionQuery,
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useUpdateTimelineWrongCounterMutation,
  useUpdateKeywordWrongCounterMutation,
} = questionApi;
