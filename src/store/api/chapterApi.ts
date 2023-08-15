import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChapterLearningModel, ChapterModel } from "../../types/chapterTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
    }),
    getChapterLearning: builder.query<ChapterLearningModel, number>({
      query: (chpaterNumber: number) => `/chapters/${chpaterNumber}/info`,
    }),
  }),
});

export const { useGetChaptersQuery, useGetChapterLearningQuery } = chapterApi;
