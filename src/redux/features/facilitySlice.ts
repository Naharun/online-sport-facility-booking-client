import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
}

interface FacilityState {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilityState = {
  facilities: [],
  loading: false,
  error: null,
};

export const fetchFacilities = createAsyncThunk(
  "facility/fetchFacilities",
  async () => {
    const response = await fetch("/api/facilities");
    const data = await response.json();
    return data;
  }
);

export const addFacility = createAsyncThunk(
  "facility/addFacility",
  async (facilityData: {
    name: string;
    description: string;
    location: string;
  }) => {
    const response = await fetch("/api/facilities", {
      method: "POST",
      body: JSON.stringify(facilityData),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteFacility = createAsyncThunk(
  "facility/deleteFacility",
  async (facilityId: string) => {
    return facilityId;
  }
);

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFacility.fulfilled, (state, action) => {
        state.facilities.push(action.payload);
      })
      .addCase(deleteFacility.fulfilled, (state, action) => {
        state.facilities = state.facilities.filter(
          (facility) => facility.id !== action.payload
        );
      });
  },
});

export default facilitySlice.reducer;
