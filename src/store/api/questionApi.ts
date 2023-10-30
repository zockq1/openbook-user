import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ExamModel,
  GetQuestionModel,
  QuestionCategoryModel,
  QuestionModel,
  RoundModel,
  TimeLineModel,
  WrongCounterModel,
} from "../../types/questionTypes";
import baseQueryWithJWT from "./baseApi";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithJWT,

  tagTypes: ["Score"],
  endpoints: (builder) => ({
    getRoundList: builder.query<RoundModel[], void>({
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
    getKtoTQuestion: builder.query<QuestionModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/get-topics-keywords/?num=${chapterNumber}`,
    }),
    getRandomQuestion: builder.query<QuestionModel[], GetQuestionModel>({
      query: (getQuestion) =>
        `/questions/random?id=${getQuestion.id}&count=${getQuestion.numberOfQuestion}`,
    }),
    getExam: builder.query<ExamModel[], number>({
      query: (roundNumber: number) => `/rounds/${roundNumber}/questions`,
    }),
    getQuestionCategoryList: builder.query<QuestionCategoryModel[], void>({
      query: () => `/question-categories`,
      providesTags: ["Score"],
    }),
    updateKeywordWrongCounter: builder.mutation<void, WrongCounterModel[]>({
      query: (counterList: WrongCounterModel[]) => {
        return {
          url: `/keyword/wrong-count`,
          method: "PATCH",
          body: counterList,
        };
      },
      invalidatesTags: ["Score"],
    }),
  }),
});

export const {
  useGetRoundListQuery,
  useGetTimelineQuery,
  useGetExamQuery,
  useGetRandomQuestionQuery,
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useGetQuestionCategoryListQuery,
  useUpdateKeywordWrongCounterMutation,
} = questionApi;
