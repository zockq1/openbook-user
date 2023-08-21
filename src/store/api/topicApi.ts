import { createApi } from "@reduxjs/toolkit/query/react";
import { TopicModel } from "../../types/topicTypes";
import baseQueryWithJWT from "./baseApi";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
    }),
    getChapterTopicList: builder.query<string[], number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
    }),
  }),
});

export const { useGetTopicQuery, useGetChapterTopicListQuery } = topicApi;
