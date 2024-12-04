import { baseApi } from "../../api/baseApi";

const imageGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "analytics/stats",
        method: "GET",
      }),
      providesTags: ["orders", "products", "users"],
    }),
    getRevenueData: builder.query({
      query: () => ({
        url: "analytics/revenue",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getOrderStatusStats: builder.query({
      query: () => ({
        url: "analytics/order-status",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetRevenueDataQuery,
  useGetOrderStatusStatsQuery,
} = imageGalleryApi;
