import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
