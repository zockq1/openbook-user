import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
} from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getChapterList: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
    }),
    getChapterTitle: builder.query<ChapterTitleModel, number>({
      query: (chapterNumber) => `/chapters/chapter-title?num=${chapterNumber}`,
    }),
    getChapterInfo: builder.query<ChapterInfoModel, number>({
      query: (chapterNumber) => `/chapters/${chapterNumber}/info`,
    }),
  }),
});

export const {
  useGetChapterListQuery,
  useGetChapterTitleQuery,
  useGetChapterInfoQuery,
} = chapterApi;
