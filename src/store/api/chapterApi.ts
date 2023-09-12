import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
  ContentModel,
  JJHChapterModel,
} from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";
import { TopicListModel } from "../../types/topicTypes";
import { ProgressModel } from "../../types/ProgressTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
  tagTypes: ["ProgressUpdate"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
    }),
    getJJHChapters: builder.query<JJHChapterModel[], void>({
      query: () => "/jjh/chapters",
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
      query: (chapterNumber) => `/contents-table?num=${chapterNumber}`,
      providesTags: ["ProgressUpdate"],
    }),
    getTotalProgress: builder.query<ProgressModel, void>({
      query: () => `/total-progress`,
      providesTags: ["ProgressUpdate"],
    }),
    updateProgress: builder.mutation<any, ContentModel>({
      query: (progress: ContentModel) => {
        return {
          url: `/study-progress/chapter/progress`,
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
  useGetJJHChaptersQuery,
  useGetChapterTitleQuery,
  useGetChapterInfoQuery,
  useGetContentListQuery,
  useGetChapterTopicListQuery,
  useLazyGetTotalProgressQuery,
  useUpdateProgressMutation,
} = chapterApi;
