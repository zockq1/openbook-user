import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithJWT from "./baseApi";
import { ContentModel } from "../../types/chapterTypes";

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    updateProgress: builder.mutation<any, ContentModel>({
      query: (progress: ContentModel) => {
        return {
          url: `/study-progress/chapter/progress`,
          method: "PATCH",
          body: progress,
        };
      },
    }),
  }),
});

export const { useUpdateProgressMutation } = progressApi;
