import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";
import { GetTimelineModel } from "../../types/timelinetypes";
import { WrongCounterModel } from "../../types/questionTypes";

export const timelineApi = createApi({
  reducerPath: "timelineApi",
  tagTypes: ["TimelineList"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTimelineList: builder.query<GetTimelineModel, void>({
      query: () => `/time-lines`,
      providesTags: ["TimelineList"],
    }),
    updateTimelineWrongCounter: builder.mutation<void, WrongCounterModel>({
      query: (counter: WrongCounterModel) => {
        return {
          url: `/timeline/wrong-count`,
          method: "PATCH",
          body: counter,
        };
      },
      invalidatesTags: ["TimelineList"],
    }),
  }),
});

export const {
  useGetTimelineListQuery,
  useLazyGetTimelineListQuery,
  useUpdateTimelineWrongCounterMutation,
} = timelineApi;
