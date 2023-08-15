import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopicModel } from "../../types/topicTypes";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
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
