import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface BookingConfirmation {
  _id: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  payableAmount: number;
  isBooked: string;
}

export interface BookingState {
  availableSlots: TimeSlot[];
  bookingConfirmation: BookingConfirmation | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BookingState = {
  availableSlots: [],
  bookingConfirmation: null,
  loading: false,
  error: null,
};

// Define the check availability thunk
export const checkAvailability = createAsyncThunk<
  { slots: TimeSlot[] },
  { date: string; facility: string },
  { rejectValue: string }
>(
  "booking/checkAvailability",
  async ({ date, facility }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/check-availability?date=${date}&facility=${facility}`
      );
      if (!response.ok) throw new Error("Failed to fetch availability");
      const data = await response.json();
      return { slots: data.slots }; // Ensure data is in the expected format
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

// Define the booking thunk
export const bookFacility = createAsyncThunk<
  { data: BookingConfirmation },
  {
    facility: string;
    date: string;
    startTime: string;
    endTime: string;
    token: string;
  },
  { rejectValue: string }
>(
  "booking/bookFacility",
  async (
    { facility, date, startTime, endTime, token },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ facility, date, startTime, endTime }),
      });
      if (!response.ok) throw new Error("Booking failed");
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearConfirmation: (state) => {
      state.bookingConfirmation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle checkAvailability states
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.availableSlots = [];
      })
      .addCase(
        checkAvailability.fulfilled,
        (state, action: PayloadAction<{ slots: TimeSlot[] }>) => {
          state.loading = false;
          state.availableSlots = action.payload.slots;
        }
      )
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error checking availability";
      })
      // Handle bookFacility states
      .addCase(bookFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookingConfirmation = null;
      })
      .addCase(
        bookFacility.fulfilled,
        (state, action: PayloadAction<{ data: BookingConfirmation }>) => {
          state.loading = false;
          state.bookingConfirmation = action.payload.data;
        }
      )
      .addCase(bookFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error booking facility";
      });
  },
});

export const { clearConfirmation } = bookingSlice.actions;
export default bookingSlice.reducer;
