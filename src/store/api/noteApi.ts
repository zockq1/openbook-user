import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnswerNoteListModel } from "../../types/answerNoteTypes";
import { BookmarkListModel, BookmarkModel } from "../../types/bookmarkTypes";

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
    addBookmark: builder.mutation({
      query: (bookmark: BookmarkModel) => {
        return {
          url: `/bookmarks`,
          method: "POST",
          body: {
            name: bookmark,
          },
        };
      },
    }),
    deleteBookmark: builder.mutation({
      query: (bookmark: BookmarkModel) => {
        return {
          url: `/bookmarks`,
          method: "DELETE",
          body: {
            name: bookmark,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAnswerNotesQuery,
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} = noteApi;
