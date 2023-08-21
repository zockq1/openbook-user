import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getKakaoToken: builder.query({
      query: (code: string) => `/login/kakao?code=${code}`,
      transformResponse: (response, meta) => {
        return {
          accessToken: meta?.response?.headers.get("Authorization"),
          data: response,
        };
      },
    }),
  }),
});

export const { useGetKakaoTokenQuery } = authApi;
