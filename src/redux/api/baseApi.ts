import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../../config/envConfig";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_API,
  }),
  endpoints: () => ({}),
});
