import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
  ContentModel,
  JJHModel,
} from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";
import { TopicListModel } from "../../types/topicTypes";
import { ProgressModel, UpdateProgressModel } from "../../types/progressTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
  tagTypes: ["ProgressUpdate"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
    }),
    getJJHList: builder.query<JJHModel, void>({
      query: () => "/jjh",
      providesTags: ["ProgressUpdate"],
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
    getContentList: builder.query<ContentModel[], number>({
      query: (jjhNumber) => `/jjh/${jjhNumber}/contents-table`,
      providesTags: ["ProgressUpdate"],
    }),
    getTotalProgress: builder.query<ProgressModel, void>({
      query: () => `/total-progress`,
      providesTags: ["ProgressUpdate"],
    }),
    updateProgress: builder.mutation<void, UpdateProgressModel>({
      query: (progress: ContentModel) => {
        return {
          url: `/jjh/progress`,
          method: "PATCH",
          body: progress,
        };
      },
      invalidatesTags: ["ProgressUpdate"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetJJHListQuery,
  useGetChapterTitleQuery,
  useGetChapterInfoQuery,
  useGetContentListQuery,
  useGetChapterTopicListQuery,
  useLazyGetTotalProgressQuery,
  useLazyGetContentListQuery,
  useUpdateProgressMutation,
} = chapterApi;
