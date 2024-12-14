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
    unsubscribe: builder.mutation({
      query: (token) => ({
        url: `newsletter/unsubscribe/?token=${token}`,
        method: "PUT",
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (email) => ({
        url: `newsletter/cancel-subscription`,
        method: "PUT",
        body: { email },
      }),
    }),
    getSubscribers: builder.query({
      query: () => ({
        url: `newsletter/subscribers`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSubscribeToNewsletterMutation,
  useUnsubscribeMutation,
  useCancelSubscriptionMutation,
  useGetSubscribersQuery,
} = newslettersApi;
