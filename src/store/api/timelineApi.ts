import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import { GetTimelineModel } from "../../types/timelinetypes";

export const timelineApi = createApi({
  reducerPath: "timelineApi",
  tagTypes: ["TimelineList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTimelineList: builder.query<GetTimelineModel, void>({
      query: () => `/time-lines`,
      providesTags: ["TimelineList"],
    }),
  }),
});

export const { useGetTimelineListQuery, useLazyGetTimelineListQuery } =
  timelineApi;
