import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChapterListModel } from "../../types/chapterTypes";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getChapters: builder.query<ChapterListModel[], void>({
      query: () => "/admin/chapters",
    }),
  }),
});

export const { useGetChaptersQuery } = chapterApi;
