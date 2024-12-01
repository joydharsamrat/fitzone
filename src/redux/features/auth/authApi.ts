import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        method: "POST",
        url: "/auth/signup",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        method: "POST",
        url: "/auth/login",
        body: userInfo,
      }),
    }),
    ChangePass: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/change-password",
        body: data,
      }),
    }),
    ForgotPass: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "/auth/forgot-password",
        body: email,
      }),
    }),
    ResetPass: builder.mutation({
      query: ({ token, password }) => {
        return {
          method: "POST",
          url: "/auth/reset-password",
          body: { password },
          headers: {
            authorization: `bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useChangePassMutation,
  useForgotPassMutation,
  useResetPassMutation,
} = authApi;
