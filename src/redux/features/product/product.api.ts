import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "products/create-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["products"],
    }),
    getAllProducts: builder.query({
      query: ({
        searchTerm = "",
        categories = "",
        minPrice = 0,
        maxPrice = 0,
        sort = "",
        page = 1,
        limit = 0,
      }) => {
        const params = new URLSearchParams();

        // Add search term if available
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        // Add categories
        if (categories && categories.length > 0) {
          const categoriesStr = categories.join(",");
          params.append("categories", categoriesStr);
        }

        // Add price range
        if (minPrice >= 0) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }

        // Add sort order
        if (sort) {
          params.append("sort", sort);
        }

        // Add pagination
        if (page) {
          params.append("page", page.toString());
        }
        if (limit) {
          params.append("limit", limit.toString());
        }

        return {
          url: `products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: "products/featured",
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    getProductsStock: builder.query({
      query: (ids) => ({
        url: `products/stock`,
        method: "POST",
        body: ids,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
  useGetProductsStockQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
