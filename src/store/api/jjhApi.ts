import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithJWT from "./baseApi";
import {
  ContentModel,
  JJHModel,
  ProgressModel,
  UpdateProgressModel,
} from "../../types/jjhTypes";

export const jjhApi = createApi({
  reducerPath: "jjhApi",
  baseQuery: baseQueryWithJWT,
  tagTypes: ["jjhUpdate"],
  endpoints: (builder) => ({
    getJJHList: builder.query<JJHModel, void>({
      query: () => "/jjh",
      providesTags: ["jjhUpdate"],
    }),
    getContentList: builder.query<ContentModel[], number>({
      query: (jjhNumber) => `/jjh/${jjhNumber}/contents-table`,
      providesTags: ["jjhUpdate"],
    }),
    getTotalProgress: builder.query<ProgressModel, void>({
      query: () => `/total-progress`,
      providesTags: ["jjhUpdate"],
    }),
    updateProgress: builder.mutation<void, UpdateProgressModel>({
      query: (progress: ContentModel) => {
        return {
          url: `/jjh/progress`,
          method: "PATCH",
          body: progress,
        };
      },
      invalidatesTags: ["jjhUpdate"],
    }),
  }),
});

export const {
  useGetJJHListQuery,
  useGetContentListQuery,
  useLazyGetTotalProgressQuery,
  useLazyGetContentListQuery,
  useUpdateProgressMutation,
} = jjhApi;
