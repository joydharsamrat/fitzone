import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders/create-order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders", "cart", "products"],
    }),
    getOrderByUserId: builder.query({
      query: () => ({
        url: "orders/user",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `orders/status/admin/${id}`,
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByUserIdQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
