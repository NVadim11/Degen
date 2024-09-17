// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const secretURL = process.env.REACT_APP_SECRET_URL;

export const phpApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: secretURL + "/api" }),
  tagTypes: ["Php"],
  endpoints: (builder) => ({
    getUserByTgId: builder.query({
      query: (id) => ({
        url: `/telegram-id/${id}`,
        method: "GET",
      }),
      providesTags: ["Php"],
    }),
  })
});

export const {
  useGetUserByTgIdQuery,
} = phpApi;
