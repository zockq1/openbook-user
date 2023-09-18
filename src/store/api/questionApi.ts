import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterWrongCounterModel,
  ExamModel,
  GetQuestionModel,
  QuestionModel,
  RoundModel,
  TimeLineModel,
  TopicWrongCounterModel,
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
    getExam: builder.query<ExamModel[], number>({
      query: (roundNumber: number) => `/rounds/${roundNumber}/questions`,
    }),
    addChapterWrongCounter: builder.mutation<void, ChapterWrongCounterModel>({
      query: (counter: ChapterWrongCounterModel) => {
        return {
          url: `/study-progress/chapter/wrong-count`,
          method: "PATCH",
          body: counter,
        };
      },
    }),
    addTopicWrongCounter: builder.mutation<void, TopicWrongCounterModel[]>({
      query: (counterList: TopicWrongCounterModel[]) => {
        return {
          url: `/study-progress/topic/wrong-count`,
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
  useGetStoTQuestionQuery,
  useGetTtoSQuestionQuery,
  useAddChapterWrongCounterMutation,
  useAddTopicWrongCounterMutation,
} = questionApi;
