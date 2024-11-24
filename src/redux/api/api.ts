import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facilitiesApi = createApi({
  reducerPath: "facilitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sports-facilities-booking.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: () => "/facility",
    }),
    createFacility: builder.mutation({
      query: (body) => ({
        url: "/facility",
        method: "POST",
        body,
      }),
    }),
    updateFacility: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilitiesApi;
