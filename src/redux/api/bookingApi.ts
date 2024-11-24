import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:5000/api",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as any).auth.token;
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     headers.set("Content-Type", "application/json");
  //     return headers;
  //   },
  //   credentials: "include", // Allow sending cookies with requests
  // }),
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
    getUserBookings: builder.query({
      query: (userId: string) => `/bookings/user/${userId}`, // Use dynamic userId
    }),
    getAdminBookings: builder.query({
      query: () => `/admin/bookings`,
    }),
  }),
});

export const { useGetUserBookingsQuery, useGetAdminBookingsQuery } = bookingApi;
