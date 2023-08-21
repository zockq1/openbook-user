import { createApi } from "@reduxjs/toolkit/query/react";
import { QuestionModel, TimeLineModel } from "../../types/questionTypes";
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
    getTtoSQuestion: builder.query<QuestionModel[], string>({
      query: (topicTitle: string) =>
        `/questions/get-senteces/?title=${topicTitle}`,
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
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useGetStoTQuestionQuery,
  useGetTtoSQuestionQuery,
} = questionApi;
