import { createApi } from "@reduxjs/toolkit/query/react";
import { ChapterLearningModel, ChapterModel } from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
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
