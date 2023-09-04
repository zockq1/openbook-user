import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChapterInfoModel,
  ChapterModel,
  ChapterTitleModel,
  ContentModel,
} from "../../types/chapterTypes";
import baseQueryWithJWT from "./baseApi";
import { TopicModel } from "../../types/topicTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithJWT,
  tagTypes: ["ProgressUpdate"],
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterModel[], void>({
      query: () => "/chapters",
      providesTags: ["ProgressUpdate"],
    }),
    getChapterTopicList: builder.query<TopicModel[], number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
    }),
    getChapterTitle: builder.query<ChapterTitleModel, number>({
      query: (chapterNumber) =>
        `/admin/chapters/chapter-title?num=${chapterNumber}`,
    }),
    getChapterInfo: builder.query<ChapterInfoModel, number>({
      query: (chapterNumber) => `/admin/chapters/${chapterNumber}/info`,
    }),
    getContentList: builder.query<ContentModel[], number>({
      query: (chapterNumber) => `/contents-table?num=${chapterNumber}`,
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
  useGetChapterTitleQuery,
  useGetChapterInfoQuery,
  useGetContentListQuery,
  useUpdateProgressMutation,
} = chapterApi;
