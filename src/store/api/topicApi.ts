import { createApi } from "@reduxjs/toolkit/query/react";
import { KeywordModel, TopicModel } from "../../types/topicTypes";
import baseQueryWithJWT from "./baseApi";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
    }),
    getKeywordList: builder.query<KeywordModel[], string>({
      query: (title) => `/topics/${title}/keywords`,
    }),
  }),
});

export const { useGetTopicQuery, useGetKeywordListQuery } = topicApi;
