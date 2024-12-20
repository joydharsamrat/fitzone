import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserById: builder.query({
      query: () => ({
        url: `users/user`,
        method: "GET",
      }),
      providesTags: ["users"],
      keepUnusedDataFor: 0,
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `users/make-admin?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `users`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useMakeAdminMutation,
  useUpdateUserInfoMutation,
} = userApi;
