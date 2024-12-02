import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders/create-order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    getOrderByUserId: builder.query({
      query: () => ({
        url: "orders/user",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByUserIdQuery } = orderApi;
