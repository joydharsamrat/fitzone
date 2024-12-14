import { baseApi } from "../../api/baseApi";

const newslettersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation({
      query: (data) => ({
        url: "newsletter/subscribe",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubscribeToNewsletterMutation } = newslettersApi;
