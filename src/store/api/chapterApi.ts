import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
} from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";
import { TopicListModel } from "../../types/topicTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getChapterList: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
    }),
    getChapterTopicList: builder.query<TopicListModel[], number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
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
  useGetChapterTopicListQuery,
} = chapterApi;
