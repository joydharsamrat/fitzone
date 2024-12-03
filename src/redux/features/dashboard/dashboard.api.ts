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
  }),
});

export const { useGetStatsQuery } = imageGalleryApi;
