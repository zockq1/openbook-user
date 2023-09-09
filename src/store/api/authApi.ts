import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetTokenModel } from "../../types/authTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
    responseHandler: "text",
  }),
  endpoints: (builder) => ({
    getKakaoToken: builder.query<GetTokenModel, string>({
      query: (code: string) => `/login/kakao?code=${code}`,
      transformResponse: (response: string, meta) => {
        const accessToken = meta?.response?.headers.get("Authorization");
        const refreshToken = meta?.response?.headers.get("Refresh-Token");
        return {
          message: response,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        };
      },
    }),
  }),
});

export const { useGetKakaoTokenQuery, useLazyGetKakaoTokenQuery } = authApi;
