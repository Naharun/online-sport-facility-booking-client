import { configureStore } from "@reduxjs/toolkit";
import { facilitiesApi } from "./api/api";
import authReducer from "../redux/auth/authSlice";
import bookingReducer from "../redux/features/bookingSlice";
import { bookingApi } from "./api/bookingApi";

export const store = configureStore({
  reducer: {
    [facilitiesApi.reducerPath]: facilitiesApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    auth: authReducer,
    booking: bookingReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(facilitiesApi.middleware)
      .concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
