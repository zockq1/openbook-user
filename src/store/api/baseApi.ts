import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQueryWithJWT = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export default baseQueryWithJWT;
