import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "products/create-product",
        method: "POST",
        body: productData,
      }),
    }),
    getAllProducts: builder.query({
      query: ({
        searchTerm,
        categories,
        minPrice,
        maxPrice,
        sort,
        page,
        limit,
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
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: "products/featured",
        method: "GET",
      }),
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
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
  useGetProductsStockQuery,
} = productApi;
