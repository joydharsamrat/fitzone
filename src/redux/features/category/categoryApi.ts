import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
