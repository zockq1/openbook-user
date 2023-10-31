import { createApi } from "@reduxjs/toolkit/query/react";
import {
  KeywordModel,
  TopicListModel,
  TopicModel,
} from "../../types/topicTypes";
import baseQueryWithJWT from "./baseApi";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
    }),
    getQuestionCategoryTopicList: builder.query<TopicListModel[], number>({
      query: (id) => `/question-categories/${id}/topics`,
    }),
    getKeywordList: builder.query<KeywordModel[], string>({
      query: (title) => `/topics/${title}/keywords`,
    }),
  }),
});

export const {
  useGetTopicQuery,
  useGetQuestionCategoryTopicListQuery,
  useGetKeywordListQuery,
} = topicApi;
