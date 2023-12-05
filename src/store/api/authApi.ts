import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetTokenModel } from "../../types/authTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getKakaoToken: builder.query<
      GetTokenModel,
      { code: string; local: string; protocol: string }
    >({
      query: ({ code, local, protocol }) =>
        `${process.env.REACT_APP_API_URL}login/kakao?code=${code}&url=${local}&protocol=${protocol}`,
      transformResponse: (response: { id: string }, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          id: response.id,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),

    getNaverToken: builder.query<
      GetTokenModel,
      { code: string; local: string; protocol: string }
    >({
      query: ({ code, local, protocol }) =>
        `${process.env.REACT_APP_API_URL}login/naver?code=${code}&url=${local}&protocol=${protocol}`,
      transformResponse: (response: { id: string }, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          id: response.id,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),

    getAppleToken: builder.query<
      GetTokenModel,
      { code: string; local: string; protocol: string }
    >({
      query: ({ code, local, protocol }) =>
        `${process.env.REACT_APP_API_URL}login/apple?code=${code}&url=${local}&protocol=${protocol}`,
      transformResponse: (response: { id: string }, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          id: response.id,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),

    getGoogleToken: builder.query<
      GetTokenModel,
      { code: string; local: string; protocol: string }
    >({
      query: ({ code, local, protocol }) =>
        `${process.env.REACT_APP_API_URL}login/kakao?code=${code}&url=${local}&protocol=${protocol}`,
      transformResponse: (response: { id: string }, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          id: response.id,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),
  }),
});

export const {
  useGetKakaoTokenQuery,
  useLazyGetKakaoTokenQuery,
  useGetNaverTokenQuery,
} = authApi;
