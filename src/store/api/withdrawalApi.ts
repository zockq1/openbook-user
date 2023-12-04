import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithJWT from "./baseApi";

export const withdrawalApi = createApi({
  reducerPath: "withdrawalApi",
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    withdrawal: builder.mutation<any, void>({
      query: () => {
        return {
          url: `/customers`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useWithdrawalMutation } = withdrawalApi;
