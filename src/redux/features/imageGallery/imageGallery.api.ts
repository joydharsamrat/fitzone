import { baseApi } from "../../api/baseApi";

const imageGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: () => ({
        url: "images",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllImagesQuery } = imageGalleryApi;
