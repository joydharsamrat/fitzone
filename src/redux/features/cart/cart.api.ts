import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (item) => {
        return {
          url: `cart/create-cart`,
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["cart"],
    }),
    getItemsByUser: builder.query({
      query: () => {
        return {
          url: `cart/user`,
          method: "GET",
        };
      },
      providesTags: ["cart"],
    }),
    updateItemQuantity: builder.mutation({
      query: ({ id, quantity }) => {
        return {
          url: `cart/user/${id}`,
          method: "PUT",
          body: { quantity },
        };
      },
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: ({ id }) => {
        return {
          url: `cart/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetItemsByUserQuery,
  useUpdateItemQuantityMutation,
  useDeleteCartItemMutation,
} = productApi;
