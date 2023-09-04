import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithJWT from "./baseApi";
import { ContentModel } from "../../types/chapterTypes";

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({}),
});

export const {} = progressApi;
