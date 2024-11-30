import { baseApi } from "../../api/baseApi";

const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: () => ({
        url: "testimonials",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTestimonialsQuery } = testimonialsApi;
