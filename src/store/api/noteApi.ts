import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnswerNoteListModel, BookmarkListModel } from "../../types/noteTypes";

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAnswerNotes: builder.query<AnswerNoteListModel, string>({
      query: (userId) => `/customers/${userId}/answer-notes`,
    }),
    getBookmarks: builder.query<BookmarkListModel, string>({
      query: (userId) => `/customers/${userId}/bookmarks`,
    }),
  }),
});

export const { useGetAnswerNotesQuery, useGetBookmarksQuery } = noteApi;
