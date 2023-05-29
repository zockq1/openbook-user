import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getKakaoToken: builder.query<string, string>({
      query: (code: string) => `/login/oauth2/code/kakao?code=${code}`,
    }),
  }),
});

export const { useGetKakaoTokenQuery } = authApi;
