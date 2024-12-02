import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders/create-order",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
