import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
