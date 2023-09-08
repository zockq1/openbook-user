import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetQuestionModel,
  QuestionModel,
  RoundModel,
  TimeLineModel,
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
        `/questions/time-flow/?num=${chapterNumber}`,
    }),
    getMockExam: builder.query<QuestionModel[], number>({
      query: (round: number) => `/questions/mock-exam/?nun=${round}`,
    }),
    getTtoKQuestion: builder.query<QuestionModel[], string>({
      query: (topicTitle: string) =>
        `/questions/get-keywords/?title=${topicTitle}`,
    }),
    getRandomQuestion: builder.query<QuestionModel[], GetQuestionModel>({
      query: (getQuestion) =>
        `/questions/random?num=${getQuestion.chapterNumber}&count=${getQuestion.numberOfQuestion}`,
    }),
    getTtoSQuestion: builder.query<QuestionModel[], string>({
      query: (topicTitle: string) =>
        `/questions/get-sentences/?title=${topicTitle}`,
    }),
    getKtoTQuestion: builder.query<QuestionModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/get-topics-keywords/?num=${chapterNumber}`,
    }),
    getStoTQuestion: builder.query<QuestionModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/get-topics-sentences/?num=${chapterNumber}`,
    }),
  }),
});

export const {
  useGetRoundsQuery,
  useGetTimelineQuery,
  useGetMockExamQuery,
  useGetRandomQuestionQuery,
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useGetStoTQuestionQuery,
  useGetTtoSQuestionQuery,
} = questionApi;
