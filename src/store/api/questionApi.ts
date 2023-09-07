import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetQuestionModel,
  QuestionModel,
  TimeLineModel,
} from "../../types/questionTypes";
import baseQueryWithJWT from "./baseApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getTimeline: builder.query<TimeLineModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/time-flow/?num=${chapterNumber}`,
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
  useGetTimelineQuery,
  useGetRandomQuestionQuery,
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useGetStoTQuestionQuery,
  useGetTtoSQuestionQuery,
} = questionApi;
